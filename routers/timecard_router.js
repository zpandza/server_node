const routes = require('express').Router();
const Controller = require('../controllers/controller');

const controller = new Controller();


routes.get('/', (req, res) => {
  res.status(200).json({ message: controller.getMessage() });
});

module.exports = routes;