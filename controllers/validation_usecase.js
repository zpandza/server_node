const Validation = require("./validation");
const validation = new Validation();

const COMPANY_NAME = 'zxp6097';

class Cases {
    validatePostDepartment = department => {
        if (validation.isDepartmentUnique(department) == true) {
            return department;
        } else {
            return `{ "Error":"Department with same department number already exists!" }`;
        }
    };

    validateGetEmployees = (companyname) => {
        if(!validation.isEmpty(companyname)){
            return null;
        } else {
            return `{ "Error":"You need to provide something as companyname" }`;
        }
    }

    validateGetEmployee = (emp_id) => {
        if(!validation.isEmpty(emp_id)){
            return null;
        } else {
            return `{ "Error":"You need to provide existant employee ID." }`;
        }
    }

    validatePostEmployee = (employee) => {
        if(validation.departmentExists(COMPANY_NAME, employee.dept_id)){
            if(validation.managerExists(COMPANY_NAME, employee.mng_id) || employee.mng_id == 0){
                if(validation.isValidDate(employee.hire_date)){
                    if(validation.isDayWeekday(employee.hire_date)){
                        if(validation.isEmployeeNumberUnique(COMPANY_NAME, employee.emp_no) || validation.isValidNumber(COMPANY_NAME, employee.emp_id, employee.emp_no)){
                            return null;
                        } else {
                            return `{ "Error":"Employee with provided Employee number already exists!" }`;
                        }
                    } else {
                        return `{ "Error":"Hire date must be one of the weekdays!" }`;
                    }
                } else {
                    return `{ "Error":"Hire date must be either current date or date in the past!" }`;
                }
            } else {
                return `{ "Error":"Manager with provided Manager ID doesn't exist!" }`;
            }
        } else {
            return `{ "Error":"Department with provided dept_id doesn't exist!" }`;
        }
    }

    validatePutEmployee = (employee) => {
        let output = this.validatePostEmployee(employee);
        if(output == null){
            if(validation.employeeExists(COMPANY_NAME, employee.emp_id)){
                return null;
            } else {
                return `{ "Error":"Employee with provided employee_id doesn't exist" }`;
            }
        } else {
            return output;
        }
    }

    validateDeleteEmployee = (emp_id) => {
        if(validation.employeeExists(COMPANY_NAME, emp_id)){
            return null;
        } else {
            return `{ "Error":"Employee with provided employee_id doesn't exist" }`;
        }
    }

}

module.exports = Cases;
