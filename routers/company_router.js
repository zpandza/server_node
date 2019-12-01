const routes = require('express').Router();

const Controller = require('../controllers/controller');

const controller = new Controller();

routes.delete('/', (req, res) => {
  let result = controller.deleteCompany(req.query.company);
  res.status(200).json({ message: result });
});

module.exports = routes;