const routes = require('express').Router();

routes.delete('/', (req, res) => {
  res.status(200).json({ message: 'Delete company' });
});

module.exports = routes;