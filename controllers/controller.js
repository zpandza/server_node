const companydata = require("companydata/index");
const Department = companydata.Department;
const Employee = companydata.Employee;
const Timecard = companydata.Timecard;

const Cases = require("./validation_usecase");
const validation = new Cases();

const Utilities = require('./utils');
const utils = new Utilities();
class Controller {
    constructor() {}

    //DELETE COMPANY
    deleteCompany = company => {
        let output = validation.validateDeleteCompany(company);
        if(output == null){
            utils.companyDeleted(company, this.deleteDepartment);
            let companyDeleted = companydata.deleteCompany(company)
            return JSON.parse(`{"Success":"${company}'s information deleted!"}`);
        }

        return JSON.parse(output)
    }


    //UPDATE DEPARTMENT
    updateDepartment = department => {
        let output = validation.validatePutDepartment(department);
        if (output == null) {
            let updatedDept = companydata.updateDepartment(department);
            return updatedDept;
        }
        return JSON.parse(output);
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
        let output = validation.validateDeleteDepartment(companyname, id);
        if (output == null) {
            utils.departmentDeleted(companyname, id, this.deleteEmployee);
            let numRows = companydata.deleteDepartment(companyname, id);
            return JSON.parse(`{"Success":"Department ${id} from company ${companyname} is deleted."}`);
        }
        return JSON.parse(output);
    };

    //GET SINGLE DEPARTMENT
    getDepartment = (company, dept_id) => {
        let output = validation.validateGetDepartment(company, dept_id);
        if (output == null) {
            let department = companydata.getDepartment(company, dept_id);
            if (department != null) {
                return department;
            }
            return JSON.parse(
                `{ "Error":"Department you searched for doesn't exist!" }`
            );
        }
        return JSON.parse(output);
    };

    //GET ALL DEPARTMENTS
    getDepartments = companyname => {
        let output = validation.validateGetDepartments(companyname);
        if (output == null) {
            let departments = companydata.getAllDepartment(companyname);
            if (!departments.length < 1) {
                return departments;
            }
            return JSON.parse(
                `{ "Error":"There are no departments in that company" }`
            );
        }
        return JSON.parse(output);
    };

    //GET ALL EMPLOYEES
    getEmployees = companyname => {
        let output = validation.validateGetEmployees(companyname);
        if (output == null) {
            let employees = companydata.getAllEmployee(companyname);
            if (employees.length > 0) {
                return employees;
            }
            return JSON.parse(
                `{ "Error":"There are no Employees in that company" }`
            );
        }
        return JSON.parse(output);
    };

    //GET SINGLE EMPLOYEE
    getEmployee = emp_id => {
        let output = validation.validateGetEmployee(emp_id);
        if (output == null) {
            let employee = companydata.getEmployee(emp_id);
            if (employee != null) return employee;

            return JSON.parse(
                `{ "Error":"Employee with provided ID doesn't exist" }`
            );
        }
        return JSON.parse(output);
    };

    //CREATE NEW EMPLOYEE
    createEmployee = employee => {
        let output = validation.validatePostEmployee(employee);
        if (output == null) {
            let newEmployee = new Employee(
                employee.emp_name,
                employee.emp_no,
                employee.hire_date,
                employee.job,
                employee.salary,
                employee.dept_id,
                employee.mng_id
            );
            newEmployee = companydata.insertEmployee(newEmployee);
            return newEmployee;
        }
        return JSON.parse(output);
    };

    //UPDATE EMPLOYEE
    updateEmployee = employee => {
        let output = validation.validatePutEmployee(employee);
        if (output == null) {
            let updatedEmp = companydata.updateEmployee(employee);
            return updatedEmp;
        }
        return JSON.parse(output);
    };
    //DELETE EMPLOYEE
    deleteEmployee = emp_id => {
        let output = validation.validateDeleteEmployee(emp_id);
        if (output == null) {
            utils.managerDeleted(emp_id);
            utils.deleteTimecards(emp_id);
            let updatedEmp = companydata.deleteEmployee(emp_id);
            return JSON.parse(`{ "Success": "Employee ${emp_id} is deleted!" }`);
        }
        return JSON.parse(output);
    };

    getTimecard = timecard_id => {
        let output = validation.validateGetTimecard(timecard_id);
        if (output == null) {
            let timecard = companydata.getTimecard(timecard_id);
            if (timecard != null) {
                return timecard;
            }
            return JSON.parse(
                `{ "Error":"Timecard with provided ID doesn't exist" }`
            );
        }
        return JSON.parse(output);
    };

    getTimecards = emp_id => {
        let output = validation.validateGetTimecards(emp_id);
        if (output == null) {
            let timecards = companydata.getAllTimecard(emp_id);
            if (timecards.length > 0) {
                return timecards;
            }
            return JSON.parse(
                `{ "Error":"There are no timecards for this employee." }`
            );
        }
        return JSON.parse(output);
    };

    createTimecard = timecard => {
        let output = validation.validatePostTimecard(timecard);
        if(output == null){
            let newTimecard = new Timecard(timecard.start_time, timecard.end_time, timecard.emp_id);
            newTimecard = companydata.insertTimecard(newTimecard);
            return newTimecard;
        }
        return JSON.parse(output);
    }

    updateTimecard = (timecard) => {
        let output = validation.validatePutTimecard(timecard);
        if(output == null){
            let updatedTimecard = companydata.updateTimecard(timecard);
            return updatedTimecard;
        }
        return JSON.parse(output);

    }

    deleteTimecard = (timecard_id) => {
        let output = validation.validateDeleteTimecard(timecard_id);
        if(output == null){
            let deletedTimecard = companydata.deleteTimecard(timecard_id);
            return JSON.parse(`{ "Success":"Timecard ${timecard_id} deleted." }`);
        }
        return JSON.parse(output);
    }
}

module.exports = Controller;
