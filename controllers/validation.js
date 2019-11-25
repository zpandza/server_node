const Controller = require("./controller.js");

const companydata = require("companydata/index");

class Validation {
    isEmpty(value) {
        return value == '' ? true : false;
    }

    departmentExists(company, dept_id){
        let flag = false;
        let allDepartments = companydata.getAllDepartment(company);
        allDepartments.forEach(e => {
            if (dept_id == e.dept_id) {
                flag = true;
            }
        });
        return flag;
    }

    managerExists(company, mng_id){
        let flag = false;
        let allEmployees = companydata.getAllEmployee(company);
        allEmployees.forEach(employee => {
            if (mng_id == employee.emp_id) {
                flag = true;
            }
        });
        return flag;
    }

    isValidDate(hire_date){
        let arr = hire_date.split('-');
        let hireDate = new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
        let currDate = new Date();

        if(hireDate.getTime() < currDate.getTime()){
            return true;
        }
        return false;
    }

    isDayWeekday(hire_date){
        let arr = hire_date.split('-');
        let hireDate = new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
        if(hireDate.getDay() != 0 && hireDate.getDay() != 7){
            return true;
        }
        return false;
    }

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

    isEmployeeNumberUnique(company, emp_no){
        let flag = true;
        let allEmployees = companydata.getAllEmployee(company);
        allEmployees.forEach(employee => {
            if (emp_no == employee.emp_no) {
                flag = false;
            }
        });
        return flag;
    }

    employeeExists(company, emp_id){
        let flag = false;
        let allEmployees = companydata.getAllEmployee(company);
        allEmployees.forEach(employee => {
            if (emp_id == employee.emp_id) {
                flag = true;
            }
        });
        return flag;
    }

    isValidNumber(company, emp_id, emp_no){
        let flag = false;
        let allEmployees = companydata.getAllEmployee(company);
        allEmployees.forEach(employee => {
            if (emp_id == employee.emp_id) {
                if(emp_no == employee.emp_no){
                    flag = true;
                }
            }
        });
        return flag;
    }

    isValidDepartmentNumber(company, dept_id, dept_no){
        let flag = false;
        let allDepartments = companydata.getAllDepartment(company);
        allDepartments.forEach(department => {
            if (dept_id == department.dept_id) {
                if(dept_no == department.dept_no){
                    flag = true;
                }
            }
        });
        return flag;
    }
}

module.exports = Validation;
