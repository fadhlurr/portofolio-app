const sequelize = require('../config/database');
const Project = require('./Project');
const JournalPost = require('./JournalPost');
const Skill = require('./Skill');
const ContactMessage = require('./ContactMessage');

module.exports = { sequelize, Project, JournalPost, Skill, ContactMessage };
