// Central error handler — every controller forwards errors here via next(err).
function errorHandler(err, req, res, next) {
  console.error(err);

  // Sequelize unique constraint violation (e.g. duplicate slug)
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors?.[0]?.path || 'field';
    return res.status(409).json({ error: `Duplicate value for field: ${field}` });
  }

  // Sequelize validation error (e.g. missing required field)
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
}

module.exports = errorHandler;
