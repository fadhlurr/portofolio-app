// Script sekali pakai untuk bikin user admin pertama.
// Jalankan dengan:
//   ADMIN_EMAIL=xxx ADMIN_PASSWORD=xxx ADMIN_NAME=xxx node src/scripts/create-admin.js
// Atau lewat Railway shell setelah deploy.

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('../models');

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD env vars first.');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  await sequelize.sync();

  const existing = await User.findOne({ where: { email: email.toLowerCase() } });
  if (existing) {
    console.log(`User ${email} already exists. Updating password...`);
    const passwordHash = await bcrypt.hash(password, 10);
    await existing.update({ passwordHash, name });
    console.log('Password updated.');
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ email: email.toLowerCase(), passwordHash, name });
    console.log(`Admin user created: ${email}`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
