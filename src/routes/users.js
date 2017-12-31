const Response = require('../classes/Response');

module.exports = (app, db) => {
  app.get('/users', async (req, res) => {
    const results = await db.User.findAll();
    const users = results.map(user => ({
      id: user.id,
      name: user.name,
    }));

    const response = new Response(200, { users });
    response.send(res);
  });
};
