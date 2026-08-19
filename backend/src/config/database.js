const { Sequelize } = require('sequelize');

// Reads DATABASE_URL from .env, e.g:
// postgresql://postgres:password@localhost:5432/portfolio_db
const isLocalDb = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL || '');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // set to console.log if you want to see every SQL query
  // Supabase (and most managed Postgres) requires SSL; local Postgres usually doesn't support it.
  dialectOptions: isLocalDb
    ? {}
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Supabase uses a cert not in Node's default CA store
        },
      },
});

module.exports = sequelize;
