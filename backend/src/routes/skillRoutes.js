const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');

router.get('/', getAllSkills);
router.post('/', adminAuth, createSkill);
router.put('/:id', adminAuth, updateSkill);
router.delete('/:id', adminAuth, deleteSkill);

module.exports = router;
