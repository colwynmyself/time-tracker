const Response = require('../classes/Response');

module.exports = (app, db) => {
  app.get('/users', async (req, res) => {
    const users = await db.User.findAll();

    const response = new Response(200, { users });
    response.send(res);
  });
};
