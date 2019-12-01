const routes = require("express").Router();

const Controller = require("../controllers/controller");

const controller = new Controller();

routes.all("/", (req, res) => {
    res.status(404).json({
        Error:
            "You need to add company, department(s), employee(s) or timecard(s) to path"
    });
});

//GET SINGLE DEPARTMENT
routes.get("/department", (req, res) => {
    let result = controller.getDepartment(req.query.company, req.query.dept_id);
    res.status(200).json(result);
});

//GET ALL DEPARTMENTS
routes.get("/departments", (req, res) => {
    let result = controller.getDepartments(req.query.company);
    res.status(200).json(result);
});

//POST DEPARTMENT
routes.post("/department", (req, res) => {
    let result = controller.createDepartment(req.body);
    res.status(200).json(result);
});

//PUT DEPARTMENT
routes.put("/department", (req, res) => {
    let result = controller.updateDepartment(req.body);
    res.status(200).json(result);
});

//DELETE DEPARTMENT
routes.delete("/department", (req, res) => {
    let result = controller.deleteDepartment(
        req.query.company,
        req.query.dept_id
    );
    res.status(200).json(result);
});

module.exports = routes;
