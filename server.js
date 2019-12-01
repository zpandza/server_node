const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//importing routers
const companyRouter = require("./routers/company_router");
const departmentRouter = require("./routers/department_router");
const employeeRouter = require("./routers/employee_router");
const timecardRouter = require("./routers/timecard_router");

const port = 3000;

app.all("/", (req, res) => {
    res.status(404).json({
        Error:
            "Please provide valid url adding /PandzaZP3/CompanyServices/"
    });
});
//MIDDLEWARE FOR USING JSON
app.use(express.json());

//MIDDLEWARE FOR USING FORMS
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTERS
app.use("/PandzaZP3/CompanyServices/company", companyRouter);
app.use("/PandzaZP3/CompanyServices/", departmentRouter);
app.use("/PandzaZP3/CompanyServices/", employeeRouter);
app.use("/PandzaZP3/CompanyServices/", timecardRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
