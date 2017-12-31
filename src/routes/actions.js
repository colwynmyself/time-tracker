const Response = require('../classes/Response');

module.exports = (app, db) => {
  app.get('/actions', async (req, res) => {
    const actions = await db.Action.findAll();

    const response = new Response(200, { actions });
    response.send(res);
  });
};
