const companydata = require("companydata/index");
const COMPANY_NAME = 'zxp6097';

class Utilities {

    //Deleting all companies
    companyDeleted(company, deleteDepartment){
        let allDepartments = companydata.getAllDepartment();
        for(let department of allDepartments){
            deleteDepartment(company, department.getId())
        }
    }

    //Deleting all departments
    departmentDeleted(companyname, id, deleteEmployee){
        let allEmployees = companydata.getAllEmployee(companyname);
        for(let emp of allEmployees){
            if(emp.getDeptId() == id){
                deleteEmployee(emp.getId());
            }
        }
    }

    //Setting mng_id to 0 for all employees whose manager was deleted.
    managerDeleted(emp_id){
        let allEmployees = companydata.getAllEmployee(COMPANY_NAME);
        for(let emp of allEmployees){
            if(emp.getMngId() == emp_id){
                emp.setMngId(0);
                companydata.updateEmployee(emp);
                console.log(emp.getMngId())
            }
        }
    }

    //delete all timecards for one employee
    deleteTimecards(emp_id){
        let allTimecards = companydata.getAllTimecard(emp_id)
        for(let timecard of allTimecards){
            companydata.deleteTimecard(timecard.getId());
        }
    }
}

module.exports = Utilities;