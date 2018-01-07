const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = process.env.TIME_TRACKER_LOG_LEVEL || 'debug';

module.exports.debug = (message, data = {}) => {
  logger.debug({
    message,
    data: JSON.stringify(data),
  });
};

module.exports.info = (message, data = {}) => {
  logger.info({
    message,
    data: JSON.stringify(data),
  });
};

module.exports.warn = (message, data = {}) => {
  logger.warn({
    message,
    data: JSON.stringify(data),
  });
};

module.exports.error = (message, err, data = {}) => {
  logger.error({
    message,
    errorMessage: err.message,
    stack: err.stack,
    data: JSON.stringify(data),
  });
};

module.exports.fatal = (message, err, data = {}) => {
  logger.fatal({
    message,
    errorMessage: err.message,
    stack: err.stack,
    data: JSON.stringify(data),
  });
};
