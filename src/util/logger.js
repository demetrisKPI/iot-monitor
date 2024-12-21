const logger = require('pino')({
  level: process.env.LOG_LEVEL || 'error',
  name: 'pino-logger',
});

module.exports = logger;
