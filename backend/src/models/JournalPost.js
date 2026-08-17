const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JournalPost = sequelize.define('JournalPost', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  excerpt: { type: DataTypes.TEXT },
  content: { type: DataTypes.TEXT, allowNull: false },
  publishedAt: { type: DataTypes.DATE },
}, {
  tableName: 'journal_posts',
  timestamps: true,
});

module.exports = JournalPost;
