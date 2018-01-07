const jwt = require('jsonwebtoken');

const jwtConfig = require('../../config/application.json').jwt;

module.exports.generateToken = (data, options) => {
  const config = {
    expiresIn: jwtConfig.expires,
  };

  if (options) {
    Object.assign(config, options);
  }

  const token = jwt.sign({
    data,
  }, jwtConfig.secret, config);

  return [null, token];
};

module.exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    return [null, decoded];
  } catch (err) {
    return [err];
  }
};

module.exports.getTokenFromHeaders = (headers) => {
  const authHeader = headers.Authentication;

  if (!authHeader) {
    return [new Error('No Authentication header found')];
  }

  return [null, authHeader.replace('Bearer ', '')];
};

module.exports.verifyTokenInHeaders = (headers) => {
  const [err, authHeader] = module.exports.getTokenFromHeaders(headers);

  if (!err) {
    return [err];
  }

  return module.exports.verifyToken(authHeader);
};
