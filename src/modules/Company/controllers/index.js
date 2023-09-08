
const { companyRepo } = require( "../repo/index.js");
const { CompanyController } = require( "./CompanyController.js");

const controllerCompany = new CompanyController(companyRepo)

module.exports = {  
    controllerCompany
}