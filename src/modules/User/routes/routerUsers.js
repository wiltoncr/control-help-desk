const express = require('express');
const { controlerUser } = require('../controllers/index.js');
const { async } = require('regenerator-runtime');

const routerUsers = express.Router();

routerUsers.get('/', async (req, res) => {
    res.render('users', { users: await  controlerUser.getAllData(), page: 'user' });
});

routerUsers.post('/createUser', (req, res) => controlerUser.createUser(req, res))

routerUsers.delete('/deleteUserById', (req, res) => controlerUser.delete(req, res));

routerUsers.get('/getusers', (req, res) => controlerUser.getAll(req, res))

routerUsers.get('/getUserById', (req, res) => controlerUser.getUserById(req, res))

routerUsers.get('/getUserByName', (req, res) => controlerUser.getUserByName(req, res))

routerUsers.get('/getUserByEmail', (req, res) => controlerUser.getUserByEmail(req, res))

module.exports = {
    routerUsers
}