const winston = require('winston');
require('winston-daily-rotate-file');

const transportInfo = new (winston.transports.DailyRotateFile)({
    filename: 'logs/info-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d',
    level: 'info'
});

const transportError = new (winston.transports.DailyRotateFile)({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d',
    level: 'error'
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    transportInfo, transportError
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
