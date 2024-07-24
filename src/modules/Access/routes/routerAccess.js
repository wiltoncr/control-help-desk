const express = require('express');
const { controleLogin } = require('../../Login/controllers');
const { controllerAccess } = require('../controllers/index.js');

const routerAccess = express.Router();

routerAccess.get('/', controleLogin.required, (req, res) => controllerAccess.getAll(req, res));

routerAccess.get('/getByDesc', controleLogin.required, (req, res) => controllerAccess.getAccessByDesc(req, res));

routerAccess.get('/:id', controleLogin.required, (req, res) => controllerAccess.getAccessById(req, res));

routerAccess.post('/', controleLogin.required, (req, res) => controllerAccess.createAccess(req, res));

routerAccess.put('/', controleLogin.required, (req, res) => controllerAccess.updateAccess(req, res));

routerAccess.delete('/:id', controleLogin.required, (req, res) => controllerAccess.delete(req, res));

module.exports = { routerAccess };