const Response = require('../classes/Response');

module.exports = (app, db) => {
  app.get('/actions', async (req, res) => {
    const actions = await db.Action.findAll();

    const response = new Response(200, { actions });
    response.send(res);
  });

  app.post('/actions', async (req, res) => {
    const data = await db.Action.create(req.body)
      .then(action => ({
        action,
      }))
      .catch(e => ({
        error: e.message,
      }));

    const response = new Response(201, data);
    response.send(res);
  });
};
