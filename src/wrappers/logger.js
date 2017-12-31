const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = process.env.TIME_TRACKER_LOG_LEVEL || 'debug';

const debug = (message, data = {}) => {
  logger.debug({
    message,
    data: JSON.stringify(data),
  });
};

const info = (message, data = {}) => {
  logger.info({
    message,
    data: JSON.stringify(data),
  });
};

const warn = (message, data = {}) => {
  logger.warn({
    message,
    data: JSON.stringify(data),
  });
};

const error = (message, err, data = {}) => {
  logger.error({
    message,
    errorMessage: err.message,
    stack: err.stack,
    data: JSON.stringify(data),
  });
};

const fatal = (message, err, data = {}) => {
  logger.fatal({
    message,
    errorMessage: err.message,
    stack: err.stack,
    data: JSON.stringify(data),
  });
};

module.exports = {
  debug,
  info,
  warn,
  error,
  fatal,
};
