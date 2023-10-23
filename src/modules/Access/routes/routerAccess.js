const express = require('express');
const { controllerAccess } = require('../controllers/index.js');

const routerAccess = express.Router();

routerAccess.get('/', (req, res) => controllerAccess.getAll(req, res));

routerAccess.get('/getByDesc', (req, res) => controllerAccess.getAccessByDesc(req, res));

routerAccess.get('/:id', (req, res) => controllerAccess.getAccessById(req, res));

routerAccess.post('/', (req, res) => controllerAccess.createAccess(req, res));

routerAccess.delete('/:id', (req, res) => controllerAccess.delete(req, res));

module.exports = { routerAccess };