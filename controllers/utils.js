const companydata = require("companydata/index");
const COMPANY_NAME = 'zxp6097';

class Utilities {

    companyDeleted(company, deleteDepartment){
        let allDepartments = companydata.getAllDepartment();
        for(let department of allDepartments){
            deleteDepartment(company, department.getId())
        }
    }

    departmentDeleted(companyname, id, deleteEmployee){
        let allEmployees = companydata.getAllEmployee(companyname);
        for(let emp of allEmployees){
            if(emp.getDeptId() == id){
                deleteEmployee(emp.getId());
            }
        }
    }

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

    deleteTimecards(emp_id){
        let allTimecards = companydata.getAllTimecard(emp_id)
        for(let timecard of allTimecards){
            companydata.deleteTimecard(timecard.getId());
        }
    }
}

module.exports = Utilities;