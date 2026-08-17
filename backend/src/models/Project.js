const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  category: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT, allowNull: false },
  content: { type: DataTypes.TEXT }, // long-form content for project detail page
  techStack: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  thumbnailUrl: { type: DataTypes.STRING },
  demoUrl: { type: DataTypes.STRING },
  repoUrl: { type: DataTypes.STRING },
  featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'projects',
  timestamps: true, // adds createdAt / updatedAt automatically
});

module.exports = Project;
