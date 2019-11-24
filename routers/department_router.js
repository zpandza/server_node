const routes = require('express').Router();

const Controller = require('../controllers/controller');

const controller = new Controller();

routes.get('/', (req, res) => {
    let result = controller.getDepartment(req.query.company, req.query.dept_id);
    res.status(200).json({ message: result });
});

routes.get('/departments', (req,res) => {
    let result = controller.getDepartments(req.query.company)
    res.status(200).json({ message: result });
});

routes.post('/', (req, res) => {
    console.log("asdads");
    // let result = controller.createDepartment(req)
    // console.log("asd");
    res.status(200).json({message: "asd"})
});

routes.delete('/', (req, res) => {
    let num_rows = controller.deleteDepartment(req.query.dept_id);
    res.status(200).json({
        message: `Department with ID ${num_rows} is deleted!`
    });
})


module.exports = routes;