const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/projects', require('./projectRoutes'));
router.use('/journal', require('./journalRoutes'));
router.use('/skills', require('./skillRoutes'));
router.use('/contact', require('./contactRoutes'));

router.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running', endpoints: ['/auth', '/projects', '/journal', '/skills', '/contact'] });
});

module.exports = router;
