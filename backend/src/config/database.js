const { Sequelize } = require('sequelize');

// Reads DATABASE_URL from .env, e.g:
// postgresql://postgres:password@localhost:5432/portfolio_db
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // set to console.log if you want to see every SQL query
});

module.exports = sequelize;
