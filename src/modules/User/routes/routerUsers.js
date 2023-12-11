const express = require('express');
const { controleLogin } = require('../../Login/controllers');
const { controlerUser } = require('../controllers');

const routerUsers = express.Router();

routerUsers.get('/', controleLogin.required, (req, res) => controlerUser.show(req, res));

routerUsers.get('/getByName', controleLogin.required, (req, res) => controlerUser.getUserByName(req, res));

routerUsers.get('/getByEmail', controleLogin.required, (req, res) => controlerUser.getUserByEmail(req, res));

routerUsers.get('/:id', controleLogin.required, (req, res) => controlerUser.getUserById(req, res));

routerUsers.post('/', (req, res) => controlerUser.createUser(req, res));

routerUsers.delete('/:id', controleLogin.required, (req, res) => controlerUser.delete(req, res));

module.exports = {
  routerUsers,
};
