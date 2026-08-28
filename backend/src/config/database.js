const { Sequelize } = require('sequelize');

// Prefer PORTOFOLIO_DATABASE_URL over DATABASE_URL.
//
// Railway kept injecting a stale DATABASE_URL into the running container: the
// dashboard and the Console shell both showed the correct credentials, while
// the process serving traffic authenticated with an older password, and a
// "Variable overwrite detected" prompt confirmed a second entry under that
// name. Rather than keep fighting for the name, read one that nothing else
// claims. DATABASE_URL still works as a fallback for local development.
// Spelled the way this project spells itself, matching the repo and the
// Railway service name.
const DATABASE_URL =
  process.env.PORTOFOLIO_DATABASE_URL || process.env.DATABASE_URL;

const isLocalDb = /localhost|127\.0\.0\.1/.test(DATABASE_URL || '');

const sequelize = new Sequelize(DATABASE_URL, {
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
module.exports.DATABASE_URL = DATABASE_URL;
module.exports.DATABASE_URL_SOURCE = process.env.PORTOFOLIO_DATABASE_URL
  ? 'PORTOFOLIO_DATABASE_URL'
  : 'DATABASE_URL';
