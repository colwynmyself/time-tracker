const Response = require('../classes/Response');
const { evaluate } = require('../utils/async');
const logger = require('../utils/logger');

module.exports = (app, db) => {
  app.get('/users', async (req, res) => {
    const [err, results] = await evaluate(db.User.findAll());

    if (err) {
      logger.error('Failed to fetch users', err);
      const response = new Response(500, err.message);
      return response.send(res);
    }

    const users = results.map(user => ({
      id: user.id,
      name: user.name,
    }));

    const response = new Response(200, users);
    return response.send(res);
  });

  app.get('/users/:userId/actions', async (req, res) => {
    const userId = (typeof req.params.userId !== 'number') ? parseInt(req.params.userId, 10) : req.params.userId;

    const [err, actions] = await evaluate(db.Action.findAll({
      where: {
        userId,
      },
    }));

    if (err) {
      logger.error(`Failed to fetch actions for user with id: ${userId}`, err);
      const response = new Response(500, err.message);
      return response.send(res);
    }

    const response = new Response(200, actions);
    return response.send(res);
  });
};
