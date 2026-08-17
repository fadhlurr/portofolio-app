const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/journalController');

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', adminAuth, createPost);
router.put('/:id', adminAuth, updatePost);
router.delete('/:id', adminAuth, deletePost);

module.exports = router;
