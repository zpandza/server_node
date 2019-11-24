const companydata = require('companydata/index');
const Validation = require('./validation');

let validation = new Validation();

class Controller {



    getMessage = () => {
        return "message";
    }

    deleteDepartment = (id) => {
        if(validation.isEmpty(id)){
            return companydata.deleteDepartment(id);
        }
    }

    getDepartment = (company, dept_id) => {
        if(validation.isEmpty(company)){
            let department = companydata.getDepartment(company, dept_id);
            return department;
        }
        return "error with department";
    }

    //Departments
    getDepartments = (companyname) => {
        if(validation.isEmpty(companyname)){
            let departments = companydata.getAllDepartment(companyname);
            return departments;
        }
        return "Please provide company name.";
    }

}
module.exports = Controller;