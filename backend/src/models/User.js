const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // NOTE: bukan 'users' — DB Supabase ini dishare sama app relationship-wrapped,
  // yang udah punya public.users sendiri (id integer, full_name, nickname).
  // Nama terpisah biar dua app gak rebutan tabel.
  tableName: 'admin_users',
  timestamps: true,
});

module.exports = User;
