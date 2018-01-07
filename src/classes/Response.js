const logger = require('../utils/logger');

class Response {
  constructor(statusCode = 200, data) {
    this.internalStatusCode = statusCode;
    this.internalData = data;
  }

  get statusCode() { return this.internalStatusCode; }
  get data() { return this.internalData; }

  generateJSON() {
    return this.internalData;
  }

  send(res) {
    res.status(this.internalStatusCode).json(this.generateJSON());
  }
}

module.exports = Response;
