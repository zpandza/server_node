const routes = require('express').Router();
const Controller = require('../controllers/controller');

const controller = new Controller();


routes.get('/', (req, res) => {
  let result = controller.getTimecard(req.query.timecard_id);
  res.status(200).json({ message: result });
});

routes.get('/timecards', (req, res) => {
  let result = controller.getTimecards(req.query.emp_id);
  res.status(200).json({ message: result });
});

routes.post('/', (req, res) => {
  let result = controller.createTimecard(req.body)
  res.status(200).json({ message: result });
});

routes.put('/', (req, res) => {
  let result = controller.updateTimecard(req.body);
  res.status(200).json({ message: result });
});

routes.delete('/', (req, res) => {
  res.status(200).json({ message: controller.getMessage() });
});


module.exports = routes;