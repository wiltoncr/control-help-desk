const express = require('express');
const { controllerClient } = require('../controllers');

const routerClient = express.Router();

routerClient.get('/', (req, res) => controllerClient.getAll(req, res));

routerClient.get('/getByName', (req, res) => controllerClient.getClientByName(req, res));

routerClient.get('/getByEmail', (req, res) => controllerClient.getClientByEmail(req, res));

routerClient.get('/:id', (req, res) => controllerClient.getClientById(req, res));

routerClient.post('/', (req, res) => controllerClient.createClient(req, res));

routerClient.delete('/:id', (req, res) => controllerClient.delete(req, res));

module.exports = { routerClient };
