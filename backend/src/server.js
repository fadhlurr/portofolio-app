require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Creates tables that don't exist yet. It does NOT alter existing tables,
    // so a model change on an existing table needs a manual migration.
    // Never switch this to sync({ alter: true }): this database is shared with
    // the relationship-wrapped app, and alter would rewrite its tables too.
    await sequelize.sync();
    console.log('Models synced with database.');

    app.listen(PORT, () => {
      console.log(`Portfolio API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start server:', err);
    process.exit(1);
  }
}

start();
