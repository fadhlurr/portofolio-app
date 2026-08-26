const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');

router.get('/', getAllSkills);
router.post('/', requireAuth, createSkill);
router.put('/:id', requireAuth, updateSkill);
router.delete('/:id', requireAuth, deleteSkill);

module.exports = router;
