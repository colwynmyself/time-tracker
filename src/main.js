// Module imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Server variables
const port = process.env.TIME_TRACKER_PORT || 3001;
const env = process.env.NODE_ENV || 'development';

// Classes
const Response = require('./classes/Response');

// Modules
const logger = require('./wrappers/logger');
const db = require('./models/Db').createConnection(env);

// Object inits
const app = express();

// App middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  const response = new Response(200, { ok: true });

  res.status(response.statusCode).json(response.generateJSON());
});

// Users
app.get('/users', async (req, res) => {
  const users = await db.User.findAll();
  const response = new Response(200, { users });

  res.status(response.statusCode).json(response.generateJSON());
});

// Actions
app.get('/actions', async (req, res) => {
  const actions = await db.Action.findAll();
  const response = new Response(200, { actions });

  res.status(response.statusCode).json(response.generateJSON());
});

// Categories
app.get('/categories', async (req, res) => {
  const categories = await db.Category.findAll();
  const response = new Response(200, { categories });

  res.status(response.statusCode).json(response.generateJSON());
});

app.all('*', (req, res) => {
  res.status(404).send();
});

// Server listen
app.listen(port, () => {
  logger.info(`time tracker started on port ${port} in ${env} mode`);
});
