const companydata = require("companydata/index");
const Department = companydata.Department;

const Cases = require("./validation_usecase");
const validation = new Cases();

class Controller {
    constructor() {}

    //TEST
    getMessage = () => {
        return "message";
    };

    //UPDATE DEPARTMENT
    updateDepartment = department => {
        let updatedDept = companydata.updateDepartment(department);
        return updatedDept;
    };

    //CREATE A DEPARTMENT
    createDepartment = department => {
        let currentDept = new Department(
            department.company,
            department.dept_name,
            department.dept_no,
            department.location
        );
        let output = validation.validatePostDepartment(currentDept);
        if (output == currentDept) {
            currentDept = companydata.insertDepartment(currentDept);
            console.log(currentDept);
            return currentDept;
        }
        return JSON.parse(output);
    };

    //DELETE DEPARTMENT
    deleteDepartment = (companyname, id) => {
        return companydata.deleteDepartment(companyname, id);
    };

    //GET SINGLE DEPARTMENT
    getDepartment = (company, dept_id) => {
        let department = companydata.getDepartment(company, dept_id);
        return department;
    };

    //GET ALL DEPARTMENTS
    getDepartments = companyname => {
        let departments = companydata.getAllDepartment(companyname);
        return departments;
    };
}

module.exports = Controller;
