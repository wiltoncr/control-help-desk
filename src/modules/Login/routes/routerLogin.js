const express = require('express');
const { controleLogin } = require('../controllers');

const routerLogin = express.Router();

routerLogin.post('/', (req, res) => controleLogin.store(req, res));

routerLogin.post('/verifyToken', (req, res) => controleLogin.token(req, res));

module.exports = {
  routerLogin,
};
