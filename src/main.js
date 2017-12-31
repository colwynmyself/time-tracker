// Module imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Server variables
const port = process.env.TIME_TRACKER_PORT || 3001;
const env = process.env.NODE_ENV || 'development';

// Modules
const logger = require('./wrappers/logger');
const db = require('./models/Db').createConnection(env);
const routes = require('./routes');

// Object inits
const app = express();

// App middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
routes(app, db);

// 404
app.all('*', (req, res) => {
  res.status(404).send();
});

// Server listen
app.listen(port, () => {
  logger.info(`time tracker started on port ${port} in ${env} mode`);
});
