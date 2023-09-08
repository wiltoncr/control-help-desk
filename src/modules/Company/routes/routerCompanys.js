const express = require('express');
const { controllerCompany } = require('../controllers/index.js');

const routerCompanys = express.Router();


routerCompanys.get('/', async (req, res) => {
    const companys = await controllerCompany.getAllData();
    res.render('companys', {page: 'company'});
}); 

routerCompanys.post('/createCompany', (req, res) => controllerCompany.createCompany(req, res))

routerCompanys.delete('/deleteCompanyById', (req, res) => controllerCompany.delete(req, res));

routerCompanys.get('/getCompanys', (req, res) => controllerCompany.getAll(req, res))

routerCompanys.get('/getCompanyById', (req, res) => controllerCompany.getCompanyById(req, res))

routerCompanys.get('/getCompanyByName', (req, res) => controllerCompany.getCompanyByName(req, res))

routerCompanys.get('/getCompanyByEmail', (req, res) => controllerCompany.getCompanyByEmail(req, res))

module.exports = {
    routerCompanys
}