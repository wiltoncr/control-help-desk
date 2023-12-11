const express = require('express');
const { controllerCompany } = require('../controllers/index');

const routerCompanys = express.Router();

routerCompanys.get('/', (req, res) => controllerCompany.getAll(req, res));

routerCompanys.get('/getByName', (req, res) => controllerCompany.getCompanyByName(req, res));

routerCompanys.get('/getByEmail', (req, res) => controllerCompany.getCompanyByEmail(req, res));

routerCompanys.get('/:id', (req, res) => controllerCompany.getCompanyById(req, res));

routerCompanys.post('/', (req, res) => controllerCompany.createCompany(req, res));

routerCompanys.delete('/:id', (req, res) => controllerCompany.delete(req, res));

module.exports = {
  routerCompanys,
};
