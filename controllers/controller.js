const companydata = require("companydata/index");
const Department = companydata.Department;
const Employee = companydata.Employee;

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

    //GET ALL EMPLOYEES
    getEmployees = companyname => {
        let output = validation.validateGetEmployees(companyname);
        if (output == null) {
            let employees = companydata.getAllEmployee(companyname);
            return employees;
        }
        return JSON.parse(output);
    };

    //GET SINGLE EMPLOYEE
    getEmployee = emp_id => {
        let output = validation.validateGetEmployee(emp_id);
        if (output == null) {
            let employee = companydata.getEmployee(emp_id);
            return employee;
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
    updateEmployee = (employee) => {
        let output = validation.validatePutEmployee(employee);
        if(output == null){
            let updatedEmp = companydata.updateEmployee(employee);
            return updatedEmp;
        } 
        return JSON.parse(output);
    }
    //DELETE EMPLOYEE
    deleteEmployee = (emp_id) => {
        let output = validation.validateDeleteEmployee(emp_id);
        if(output == null){
            let updatedEmp = companydata.deleteEmployee(emp_id);
            return updatedEmp;
        } 
        return JSON.parse(output);
    }
}

module.exports = Controller;
