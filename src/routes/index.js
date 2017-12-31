const actions = require('./actions');
const categories = require('./categories');
const users = require('./users');

module.exports = (app, db) => {
  actions(app, db);
  categories(app, db);
  users(app, db);
};
