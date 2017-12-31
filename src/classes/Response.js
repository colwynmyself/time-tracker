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
}

module.exports = Response;
