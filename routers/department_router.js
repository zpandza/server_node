const routes = require("express").Router();

const Controller = require("../controllers/controller");

const controller = new Controller();

//GET SINGLE DEPARTMENT
routes.get("/", (req, res) => {
    let result = controller.getDepartment(req.query.company, req.query.dept_id);
    res.status(200).json({ message: result });
});

//GET ALL DEPARTMENTS
routes.get("/departments", (req, res) => {
    let result = controller.getDepartments(req.query.company);
    res.status(200).json({ message: result });
});

//POST DEPARTMENT
routes.post("/", (req, res) => {
    let result = controller.createDepartment(req.body);
    console.log(result);
    res.status(200).json(result);
});

//PUT DEPARTMENT
routes.put("/", (req, res) => {
    let result = controller.updateDepartment(req.body);
    console.log(result);
    res.status(200).json({ message: result });
});

//DELETE DEPARTMENT
routes.delete("/", (req, res) => {
    let num_rows = controller.deleteDepartment(
        req.query.company,
        req.query.dept_id
    );
    res.status(200).json({
        message: `Department with ID ${num_rows} is deleted!`
    });
});

module.exports = routes;
