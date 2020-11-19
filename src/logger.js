const winston = require('winston');
const { LOG_LEVEL } = require('./helpers/config');

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
