const express = require('express');
const { controlerUser } = require('../controllers/index.js');

const routerUsers = express.Router();

routerUsers.get('/', (req, res) => controlerUser.getAll(req, res));

routerUsers.get('/getByName', (req, res) => controlerUser.getUserByName(req, res));

routerUsers.get('/getByEmail', (req, res) => controlerUser.getUserByEmail(req, res));

routerUsers.get('/:id', (req, res) => controlerUser.getUserById(req, res));

routerUsers.post('/', (req, res) => controlerUser.createUser(req, res));

routerUsers.delete('/:id', (req, res) => controlerUser.delete(req, res));

module.exports = {
    routerUsers
};