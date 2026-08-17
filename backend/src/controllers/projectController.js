const { Project } = require('../models');

// GET /api/projects
async function getAllProjects(req, res, next) {
  try {
    const projects = await Project.findAll({
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

// GET /api/projects/:slug
async function getProjectBySlug(req, res, next) {
  try {
    const project = await Project.findOne({ where: { slug: req.params.slug } });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

// POST /api/projects  (admin only)
async function createProject(req, res, next) {
  try {
    const { title, slug, description } = req.body;
    if (!title || !slug || !description) {
      return res.status(400).json({ error: 'title, slug, and description are required' });
    }
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

// PUT /api/projects/:id  (admin only)
async function updateProject(req, res, next) {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.update(req.body);
    res.json(project);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/projects/:id  (admin only)
async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProjects, getProjectBySlug, createProject, updateProject, deleteProject };
