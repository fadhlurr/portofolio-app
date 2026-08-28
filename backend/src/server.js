require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 4000;

// Start listening first, connect to the database after. Exiting on a failed
// connection turns a temporary database problem into a crash loop: Railway
// keeps serving the previous container, which still holds the old environment,
// so a corrected variable never reaches the process that answers traffic.
// Staying up also keeps us from hammering Supabase, whose pooler blocks new
// connections after repeated auth failures.
app.listen(PORT, () => {
  console.log(`Portfolio API listening on port ${PORT}`);
  connectWithRetry();
});

async function connectWithRetry(attempt = 1) {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Creates tables that don't exist yet. It does NOT alter existing tables,
    // so a model change on an existing table needs a manual migration.
    // Never switch this to sync({ alter: true }): the portfolio database is
    // shared territory, and alter would rewrite tables this app does not own.
    await sequelize.sync();
    console.log('Models synced with database.');
  } catch (err) {
    if (attempt === 1) logConnectionTarget();
    // Back off 5s, 10s, 20s, 40s, then every 60s.
    const delay = Math.min(5000 * 2 ** (attempt - 1), 60000);
    console.error(
      `Database connection attempt ${attempt} failed: ${err.message}. Retrying in ${delay / 1000}s.`
    );
    setTimeout(() => connectWithRetry(attempt + 1), delay);
  }
}

// Prints which database the process is actually pointed at, so a stale or
// mistyped DATABASE_URL is visible in the deploy logs. Never logs the
// password itself — only its length and first/last characters.
function logConnectionTarget() {
  try {
    const db = require('./config/database');
    const url = new URL(db.DATABASE_URL);
    console.error(
      'Connecting via %s as user=%s host=%s port=%s db=%s passwordLength=%d passwordEdges=%s..%s',
      db.DATABASE_URL_SOURCE,
      url.username,
      url.hostname,
      url.port,
      url.pathname.slice(1),
      url.password.length,
      url.password.slice(0, 3),
      url.password.slice(-3)
    );
  } catch (err) {
    console.error('No usable database URL: set PORTOFOLIO_DATABASE_URL or DATABASE_URL.');
  }
}
