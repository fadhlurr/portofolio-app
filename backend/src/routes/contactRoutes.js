const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  submitMessage,
  getAllMessages,
  markAsRead,
  deleteMessage,
} = require('../controllers/contactController');

router.post('/', submitMessage);          // public
router.get('/', requireAuth, getAllMessages);
router.put('/:id/read', requireAuth, markAsRead);
router.delete('/:id', requireAuth, deleteMessage);

module.exports = router;
