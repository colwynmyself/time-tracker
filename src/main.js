// Module imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// Server variables
const port = process.env.TIME_TRACKER_PORT || 3001;
const env = process.env.NODE_ENV || 'development';
const credentials = require('../config/application.json');

// Modules
const db = require('./models/Db').createConnection(env);
const logger = require('./utils/logger');
const routes = require('./routes');
const Passport = require('./utils/passport');

// Object inits
const app = express();
const passport = Passport(app, db);
app.use(session({
  store: new RedisStore(),
  secret: credentials.sessionKey,
}));
app.use(passport.initialize());
app.use(passport.session());

// App middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
routes(app, db, passport);

app.get('/', (req, res) => {
  if (!req.user) {
    res.send('<a href="/auth/google" title="Login">Login</a>');
  } else {
    res.send(`Hello, ${req.user.name}!`);
  }
});

// 404
app.all('*', (req, res) => {
  res.status(404).send();
});

// Server listen
app.listen(port, () => {
  logger.info(`time tracker started on port ${port} in ${env} mode`);
});
