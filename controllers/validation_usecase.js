const Validation = require("./validation");
const validation = new Validation();

const COMPANY_NAME = "zxp6097";

class Cases {
    validateGetDepartment = (company, dept_id) => {
        if (!validation.isEmpty(company) && !validation.isEmpty(dept_id)) {
            return null;
        } else {
            return `{ "Error":"Please provide name of company and DepartmentID" }`;
        }
    };

    validateGetDepartments = company => {
        if (!validation.isEmpty(company)) {
            return null;
        } else {
            return `{ "Error":"Please provide name of company" }`;
        }
    };
    validatePostDepartment = department => {
        if (validation.isDepartmentUnique(department) == true) {
            return department;
        } else {
            return `{ "Error":"Department with same department number already exists!" }`;
        }
    };

    validatePutDepartment = department => {
        if (validation.departmentExists(COMPANY_NAME, department.dept_id)) {
            if (
                validation.isDepartmentUnique(department) == true ||
                validation.isValidDepartmentNumber(
                    COMPANY_NAME,
                    department.dept_id,
                    department.dept_no
                )
            ) {
                return null;
            } else {
                return `{ "Error":"Department with same department number already exists!" }`;
            }
        } else {
            return `{ "Error":"Department with provided ID doesn't exist!" }`;
        }
    };

    validateDeleteDepartment = (company, dept_id) => {
        if (!validation.isEmpty(company) && !validation.isEmpty(dept_id)) {
            if (validation.departmentExists(company, dept_id)) {
                return null;
            } else {
                return `{ "Error":"Department you searched for doesn't exist!" }`;
            }
        } else {
            return `{ "Error":"You need to provide companyname and department id" }`;
        }
    };

    validateGetEmployees = companyname => {
        if (!validation.isEmpty(companyname)) {
            return null;
        } else {
            return `{ "Error":"You need to provide companyname" }`;
        }
    };

    validateGetEmployee = emp_id => {
        if (!validation.isEmpty(emp_id)) {
            return null;
        } else {
            return `{ "Error":"You need to provide employee ID." }`;
        }
    };

    validatePostEmployee = employee => {
        if (validation.departmentExists(COMPANY_NAME, employee.dept_id)) {
            if (
                validation.managerExists(COMPANY_NAME, employee.mng_id) ||
                employee.mng_id == 0
            ) {
                if (validation.isValidDate(employee.hire_date)) {
                    if (validation.isDayWeekday(employee.hire_date)) {
                        if (
                            validation.isEmployeeNumberUnique(
                                COMPANY_NAME,
                                employee.emp_no
                            ) ||
                            validation.isValidNumber(
                                COMPANY_NAME,
                                employee.emp_id,
                                employee.emp_no
                            )
                        ) {
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
    };

    validatePutEmployee = employee => {
        if (validation.employeeExists(COMPANY_NAME, employee.emp_id)) {
            let output = this.validatePostEmployee(employee);
            if (output == null) {
                return null;
            } else {
                return output;
            }
        } else {
            return `{ "Error":"Employee with provided employee_id doesn't exist" }`;
        }
    };

    validateDeleteEmployee = emp_id => {
        if (validation.employeeExists(COMPANY_NAME, emp_id)) {
            return null;
        } else {
            return `{ "Error":"Employee with provided employee_id doesn't exist" }`;
        }
    };

    validateGetTimecard = timecard_id => {
        if (!validation.isEmpty(timecard_id)) {
            return null;
        } else {
            return `{ "Error":"You need to provide timecard_id" }`;
        }
    };

    validateGetTimecards = emp_id => {
        if (!validation.isEmpty(emp_id)) {
            if (validation.employeeExists(COMPANY_NAME, emp_id)) {
                return null;
            } else {
                return `{ "Error":"Employee with provided employee_id doesn't exist" }`;
            }
        } else {
            return `{ "Error":"You need to provide employee id." }`;
        }
    };

    validatePostTimecard = timecard => {
        if (validation.employeeExists(COMPANY_NAME, timecard.emp_id)) {
            if (validation.validateStartDate(timecard.start_time)) {
                if (
                    validation.validateEndDate(
                        timecard.start_time,
                        timecard.end_time
                    )
                ) {
                    if (validation.isDayWeekday(validation.prepareTimecardDate(timecard.start_time)) && 
                        validation.isDayWeekday(validation.prepareTimecardDate(timecard.end_time))) {
                            if(validation.isWorkingHours(timecard.start_time) &&
                                validation.isWorkingHours(timecard.end_time)){
                                    if(validation.isStartPossible(timecard.start_time, timecard.emp_id)){
                                        return null;
                                    } else {
                                        return `{ "Error":"There is already one timecard for selected start_time." }`;
                                    }
                            } else {
                                return `{ "Error":"Start time and End time need to be inside working hours. (06:00 - 18:00)" }`;
                            }
                    } else {
                        return `{ "Error":"End time and Start time need to be weekdays." }`;
                    }
                } else {
                    return `{ "Error":"End time needs to be later than start time, but in the same day." }`;
                }
            } else {
                return `{ "Error":"Start time needs to be in past 7 days from today's date." }`;
            }
        } else {
            return `{ "Error":"Employee with provided employee_id doesn't exist" }`;
        }
    };

    validatePutTimecard = (timecard) => {
        if(validation.timecardExists(timecard.timecard_id)){
            //TODO
            return null;
        } else {
            return `{ "Error":"Timecard with provided timecard_id doesn't exist" }`;
        }
    }
}

module.exports = Cases;
