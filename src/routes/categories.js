const Response = require('../classes/Response');

module.exports = (app, db) => {
  app.get('/categories', async (req, res) => {
    const categories = await db.Category.findAll();

    const response = new Response(200, { categories });
    response.send(res);
  });

  app.get('/categories/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = await db.Category.findOne({
      where: {
        id: categoryId,
      },
      include: ['SubCategories'],
    });

    let response;
    if (!category) {
      response = new Response(404);
    } else {
      response = new Response(200, category);
    }
    response.send(res);
  });

  app.post('/categories', async (req, res) => {
    const data = await db.Category.create(req.body)
      .then(category => ({
        category,
      }))
      .catch(e => ({
        error: e.message,
      }));

    const response = new Response(201, data);
    response.send(res);
  });

  app.put('/categories/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const data = await db.Category.update(req.body, {
      where: {
        id: categoryId,
      },
      returning: true,
      plain: true,
    })
      .then(result => ({
        category: result[1],
      }))
      .catch(e => ({
        error: e.message,
      }));

    const response = new Response(201, data);
    response.send(res);
  });

  app.delete('/categories/:categoryId', async (req, res) => {
    const categoryId = parseInt(req.params.categoryId, 10);
    const data = await db.Category.destroy({
      where: {
        id: categoryId,
      },
    })
      .catch(e => ({
        error: e.message,
      }));

    const response = new Response(204, data);
    response.send(res);
  });
};
