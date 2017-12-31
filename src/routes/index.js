const actions = require('./actions');
const auth = require('./auth');
const categories = require('./categories');
const users = require('./users');

module.exports = (app, db, passport) => {
  actions(app, db);
  auth(app, db, passport);
  categories(app, db);
  users(app, db);
};
