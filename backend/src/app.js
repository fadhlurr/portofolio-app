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

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Central error handler — must be registered last
app.use(errorHandler);

module.exports = app;
