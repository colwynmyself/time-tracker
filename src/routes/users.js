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

  app.get('/users/:userId/actions', async (req, res) => {
    const userId = (typeof req.params.userId !== 'number') ? parseInt(req.params.userId, 10) : req.params.userId;
    const data = await db.Action
      .findAll({
        where: {
          userId,
        },
      })
      .then(actions => ({
        actions,
      }))
      .catch(e => ({
        error: e.message,
      }));

    const response = new Response(200, data);
    response.send(res);
  });
};
