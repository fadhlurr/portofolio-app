const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Each configured origin also allows its www/non-www twin, so CORS_ORIGIN only
// needs to list one form of the domain.
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
  .flatMap((origin) =>
    origin.includes('://www.')
      ? [origin, origin.replace('://www.', '://')]
      : [origin, origin.replace('://', '://www.')]
  );

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api', routes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// TEMPORARY diagnostic: reports which database this process is pointed at and
// whether it can reach it. Deliberately exposes no secret — the password is
// reduced to its length and a SHA-256 prefix, which is enough to compare
// against a known-good value but useless to an attacker. Remove once the
// Railway credential mismatch is resolved.
app.get('/health/db', async (req, res) => {
  const { sequelize } = require('./models');
  const db = require('./config/database');
  const crypto = require('crypto');
  const out = { source: db.DATABASE_URL_SOURCE };
  try {
    const url = new URL(db.DATABASE_URL);
    out.user = url.username;
    out.host = url.hostname;
    out.port = url.port;
    out.database = url.pathname.slice(1);
    out.passwordLength = url.password.length;
    out.passwordFingerprint = crypto
      .createHash('sha256')
      .update(decodeURIComponent(url.password))
      .digest('hex')
      .slice(0, 12);
  } catch (err) {
    out.error = 'DATABASE_URL missing or unparseable';
    return res.json(out);
  }
  try {
    await sequelize.authenticate();
    out.connected = true;
  } catch (err) {
    out.connected = false;
    out.connectionError = err.message;
  }
  res.json(out);
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Central error handler — must be registered last
app.use(errorHandler);

module.exports = app;
