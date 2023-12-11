const { companyRepo } = require('../repo/index');
const { CompanyController } = require('./CompanyController');

const controllerCompany = new CompanyController(companyRepo);

module.exports = {
  controllerCompany,
};
