const { ContactMessage } = require('../models');

// POST /api/contact  (public)
async function submitMessage(req, res, next) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    const saved = await ContactMessage.create({ name, email, message });
    res.status(201).json({ success: true, id: saved.id });
  } catch (err) {
    next(err);
  }
}

// GET /api/contact  (admin only)
async function getAllMessages(req, res, next) {
  try {
    const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

// PUT /api/contact/:id/read  (admin only)
async function markAsRead(req, res, next) {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    await message.update({ read: true });
    res.json(message);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/contact/:id  (admin only)
async function deleteMessage(req, res, next) {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    await message.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { submitMessage, getAllMessages, markAsRead, deleteMessage };
