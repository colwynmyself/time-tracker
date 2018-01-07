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
