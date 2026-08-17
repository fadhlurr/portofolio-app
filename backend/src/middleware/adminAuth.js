// Very simple API-key based protection for write operations (POST/PUT/DELETE).
// Good enough for a personal admin panel used only by you.
// For anything more serious, swap this for real auth (sessions/JWT + login).
function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'];

  if (!key || key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: missing or invalid admin key' });
  }

  next();
}

module.exports = adminAuth;
