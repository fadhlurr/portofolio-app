const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', requireAuth, createProject);
router.put('/:id', requireAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);

module.exports = router;
