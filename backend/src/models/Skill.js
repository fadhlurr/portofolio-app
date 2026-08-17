const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  category: { type: DataTypes.STRING, allowNull: false }, // "Frontend", "Backend", dst
  name: { type: DataTypes.STRING, allowNull: false },
  proficiency: { type: DataTypes.INTEGER, allowNull: false }, // 0-100
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'skills',
  timestamps: false,
});

module.exports = Skill;
