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
        console.log(typeof hire_date);
        let arr = hire_date.split('-');
        let hireDate = new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
        if(hireDate.getDay() != 0 && hireDate.getDay() != 7){
            console.log(hireDate.getDay())
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

    validateStartDate(start_time){
        let start_time_date = new Date(start_time);
        let tempDate = new Date();
        tempDate.setDate(tempDate.getDate());
        let date_difference = tempDate.getTime() - start_time_date.getTime();
        let dayToMillis = 86400000;
        date_difference = date_difference / dayToMillis;
        if(date_difference >= 0 && date_difference < 7){
            return true;
        }
        return false;
    }

    validateEndDate(start_time, end_time){
        let start_date = new Date(start_time);
        let end_date = new Date(end_time);
        if(start_date.getFullYear() == end_date.getFullYear()){
            if(start_date.getMonth() == end_date.getMonth()){
                if(start_date.getDate() == end_date.getDate()){
                    let hourToMilliseconds = 3600000;
                    if(end_date.getTime() - start_date.getTime() >= hourToMilliseconds){
                        return true;
                    }
                }
            }
        }

        return false;
    }

    isWorkingHours(time){
        let date = new Date(time);
        if(date.getHours() >= 6 && date.getHours() < 18){
            return true;
        }
        return false;
    }

    prepareTimecardDate(date){
        let arr = date.split(" ");
        return arr[0] + "";
    }

    isStartPossible(start_time, emp_id){
        let flag = true;
        let allTimecards = companydata.getAllTimecard(emp_id);
        allTimecards.forEach(timecard => {
            if (this.prepareTimecardDate(start_time) == this.prepareTimecardDate(timecard.start_time)) {
                flag = false;
            }
        });
        return flag;
    }

    timecardExists(timecard_id){
        let timecard = companydata.getTimecard(timecard_id);
        if(timecard != null){
            return true;
        }
        return false;
    }

    isUpdatePossible(timecard){
        let flag = true;

        if(timecard != null){
            let temp_timecard = companydata.getTimecard(timecard.timecard_id);
            let tempEmp_id = temp_timecard.emp_id;
            let allTimecards = companydata.getAllTimecard(tempEmp_id);
            allTimecards.forEach(tc => {
                if (this.prepareTimecardDate(timecard.start_time) == this.prepareTimecardDate(tc.start_time)) {
                    if(timecard.timecard_id != tc.timecard_id){
                        flag = false;
                    }
                }
            });
        }
        return flag;
    }
}

module.exports = Validation;
