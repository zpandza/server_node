const routes = require('express').Router();

const Controller = require("../controllers/controller");
const controller = new Controller();

//GET EMPLOYEE
routes.get('/', (req, res) => {
  let result = controller.getEmployee(req.query.emp_id);
  res.status(200).json(result);
});

//GET EMPLOYEES
routes.get('/employees', (req, res) => {
  let result = controller.getEmployees(req.query.company);
  res.status(200).json(result)
});

//POST EMPLOYEE
routes.post('/', (req, res) => {
  let result = controller.createEmployee(req.body);
  res.status(200).json({
    message: result
  })
});

//PUT EMPLOYEE
routes.put('/', (req, res) => {
  let result = controller.updateEmployee(req.body)
  res.status(200).json({
    message: result
  })
});

//DELETE EMPLOYEE
routes.delete('/', (req, res) => {
  let result = controller.deleteEmployee(req.query.emp_id)
  res.status(200).json({
    message: result
  })
})

module.exports = routes;