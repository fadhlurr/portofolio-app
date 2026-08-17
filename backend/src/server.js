require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Creates tables if they don't exist yet, and adds missing columns.
    // For a first run this is enough — no separate migration step needed.
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
