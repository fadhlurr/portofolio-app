const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  submitMessage,
  getAllMessages,
  markAsRead,
  deleteMessage,
} = require('../controllers/contactController');

router.post('/', submitMessage);          // public
router.get('/', adminAuth, getAllMessages);
router.put('/:id/read', adminAuth, markAsRead);
router.delete('/:id', adminAuth, deleteMessage);

module.exports = router;
