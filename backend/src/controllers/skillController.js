const { Skill } = require('../models');

// GET /api/skills
async function getAllSkills(req, res, next) {
  try {
    const skills = await Skill.findAll({ order: [['category', 'ASC'], ['order', 'ASC']] });
    res.json(skills);
  } catch (err) {
    next(err);
  }
}

// POST /api/skills  (admin only)
async function createSkill(req, res, next) {
  try {
    const { category, name, proficiency } = req.body;
    if (!category || !name || proficiency == null) {
      return res.status(400).json({ error: 'category, name, and proficiency are required' });
    }
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
}

// PUT /api/skills/:id  (admin only)
async function updateSkill(req, res, next) {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    await skill.update(req.body);
    res.json(skill);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/skills/:id  (admin only)
async function deleteSkill(req, res, next) {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    await skill.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllSkills, createSkill, updateSkill, deleteSkill };
