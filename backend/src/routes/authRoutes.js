const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { login, getCurrentUser } = require('../controllers/authController');

router.post('/login', login);
router.get('/me', requireAuth, getCurrentUser);

module.exports = router;
