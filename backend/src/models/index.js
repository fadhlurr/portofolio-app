const sequelize = require('../config/database');
const Project = require('./Project');
const JournalPost = require('./JournalPost');
const Skill = require('./Skill');
const ContactMessage = require('./ContactMessage');
const User = require('./User');

module.exports = { sequelize, Project, JournalPost, Skill, ContactMessage, User };
