const Controller = require("./controller.js");

const companydata = require("companydata/index");

class Validation {
    isEmpty() {
        if (value) return true;
        return false;
    }

    deleteDepartment = () => {};

    isDepartmentUnique(department) {
        let flag = true;
        console.log(department);
        let allDepartments = companydata.getAllDepartment(department.company);
        allDepartments.forEach(e => {
            if (department.dept_no == e.dept_no) {
                flag = false;
            }
        });
        return flag;
    }
}

module.exports = Validation;
