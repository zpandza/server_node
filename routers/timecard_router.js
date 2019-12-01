const routes = require('express').Router();
const Controller = require('../controllers/controller');

const controller = new Controller();


routes.get('/timecard', (req, res) => {
  let result = controller.getTimecard(req.query.timecard_id);
  res.status(200).json(result);
});

routes.get('/timecards', (req, res) => {
  let result = controller.getTimecards(req.query.emp_id);
  res.status(200).json(result);
});

routes.post('/timecard', (req, res) => {
  let result = controller.createTimecard(req.body)
  res.status(200).json(result);
});

routes.put('/timecard', (req, res) => {
  let result = controller.updateTimecard(req.body);
  res.status(200).json(result);
});

routes.delete('/timecard', (req, res) => {
  let result = controller.deleteTimecard(req.query.timecard_id);
  res.status(200).json(result);
});


module.exports = routes;