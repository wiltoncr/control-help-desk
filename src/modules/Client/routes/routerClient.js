const express = require('express');
const { controleLogin } = require('../../Login/controllers');
const { controllerClient } = require('../controllers');

const routerClient = express.Router();

routerClient.get('/', controleLogin.required, (req, res) => controllerClient.getAll(req, res));

routerClient.get('/:id', controleLogin.required, (req, res) => controllerClient.getClientById(req, res));

routerClient.get('/getByName', controleLogin.required, (req, res) => controllerClient.getClientByName(req, res));

routerClient.get('/getByEmail', controleLogin.required, (req, res) => controllerClient.getClientByEmail(req, res));

routerClient.put('/', controleLogin.required, (req, res) => controllerClient.updateClient(req, res));

routerClient.post('/', controleLogin.required, (req, res) => controllerClient.createClient(req, res));

routerClient.delete('/:id', controleLogin.required, (req, res) => controllerClient.delete(req, res));

module.exports = { routerClient };
