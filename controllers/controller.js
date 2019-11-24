const companydata = require('companydata/index');
const Validation = require('./validation');
const Department = companydata.Department;
let validation = new Validation();

class Controller {



    //TEST
    getMessage = () => {
        return "message";
    }


    //UPDATE DEPARTMENT
    updateDepartment = (department) => {
        let updatedDept = companydata.updateDepartment(department);
        return updatedDept;
    }

    //CREATE A DEPARTMENT
    createDepartment = (department) => {
        let currentDept = new Department(department.company, department.dept_name, department.dept_no, department.location);       
        currentDept = companydata.insertDepartment(currentDept);
        console.log(currentDept);
        return currentDept;
    }


    //DELETE DEPARTMENT
    deleteDepartment = (companyname, id) => {
        if(validation.isEmpty(id)){
            return companydata.deleteDepartment(companyname, id);
        }
    }

    //GET SINGLE DEPARTMENT
    getDepartment = (company, dept_id) => {
        if(validation.isEmpty(company)){
            let department = companydata.getDepartment(company, dept_id);
            return department;
        }
        return "error with department";
    }

    //GET ALL DEPARTMENTS
    getDepartments = (companyname) => {
        if(validation.isEmpty(companyname)){
            let departments = companydata.getAllDepartment(companyname);
            return departments;
        }
        return "Please provide company name.";
    }

}
module.exports = Controller;