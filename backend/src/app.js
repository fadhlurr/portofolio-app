const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',');
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api', routes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// TEMP debug route — remove after diagnosing CORS_ORIGIN parsing issue
app.get('/debug-cors', (req, res) => {
  res.json({
    raw: process.env.CORS_ORIGIN,
    requestOrigin: req.headers.origin || null,
    list: allowedOrigins.map((o) => ({
      value: o,
      length: o.length,
      codes: [...o].map((c) => c.charCodeAt(0)),
    })),
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Central error handler — must be registered last
app.use(errorHandler);

module.exports = app;
