const { JournalPost } = require('../models');

// GET /api/journal
async function getAllPosts(req, res, next) {
  try {
    const posts = await JournalPost.findAll({ order: [['publishedAt', 'DESC']] });
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

// GET /api/journal/:slug
async function getPostBySlug(req, res, next) {
  try {
    const post = await JournalPost.findOne({ where: { slug: req.params.slug } });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

// POST /api/journal  (admin only)
async function createPost(req, res, next) {
  try {
    const { title, slug, content } = req.body;
    if (!title || !slug || !content) {
      return res.status(400).json({ error: 'title, slug, and content are required' });
    }
    const data = { ...req.body };
    if (!data.publishedAt) data.publishedAt = new Date();
    const post = await JournalPost.create(data);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

// PUT /api/journal/:id  (admin only)
async function updatePost(req, res, next) {
  try {
    const post = await JournalPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await post.update(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/journal/:id  (admin only)
async function deletePost(req, res, next) {
  try {
    const post = await JournalPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await post.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllPosts, getPostBySlug, createPost, updatePost, deletePost };
