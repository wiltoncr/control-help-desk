const express = require('express');
const { controlerLogin } = require('../controllers');

const routerLogin = express.Router();

routerLogin.post('/', (req, res) => controlerLogin.store(req, res));

module.exports = {
  routerLogin,
};
