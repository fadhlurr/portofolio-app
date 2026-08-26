const jwt = require('jsonwebtoken');

// Verify JWT dari header: Authorization: Bearer <token>
// Kalau valid, isi req.user dengan payload dan lanjut ke controller.
// Kalau tidak, return 401.
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: missing or invalid token' });
  }

  const token = authHeader.slice(7); // hapus "Bearer "

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { userId, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: invalid or expired token' });
  }
}

module.exports = requireAuth;
