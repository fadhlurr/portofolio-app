const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/journalController');

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', requireAuth, createPost);
router.put('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost);

module.exports = router;
