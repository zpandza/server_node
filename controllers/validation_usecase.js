const Validation = require("./validation");
const validation = new Validation();

class Cases {
    validatePostDepartment = department => {
        if (validation.isDepartmentUnique(department) == true) {
            return department;
        } else {
            return `{ "Error":"Department with same department number already exists!" }`;
        }
    };
}

module.exports = Cases;
