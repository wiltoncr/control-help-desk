const express = require('express');
const { controleLogin } = require('../../Login/controllers');
const { controllerCompany } = require('../controllers/index');

const routerCompanys = express.Router();

routerCompanys.get('/', controleLogin.required, (req, res) => controllerCompany.getAll(req, res));

routerCompanys.get('/getByName', controleLogin.required, (req, res) => controllerCompany.getCompanyByName(req, res));

routerCompanys.get('/getByEmail', controleLogin.required, (req, res) => controllerCompany.getCompanyByEmail(req, res));

routerCompanys.get('/:id', controleLogin.required, (req, res) => controllerCompany.getCompanyById(req, res));

routerCompanys.put('/', controleLogin.required, (req, res) => controllerCompany.updateCompany(req, res));

routerCompanys.post('/', controleLogin.required, (req, res) => controllerCompany.createCompany(req, res));

routerCompanys.delete('/:id', controleLogin.required, (req, res) => controllerCompany.delete(req, res));

module.exports = {
  routerCompanys,
};
