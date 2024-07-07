const express = require('express');
const { controleLogin } = require('../controllers');

const routerLogin = express.Router();

routerLogin.post('/', (req, res) => controleLogin.store(req, res));

module.exports = {
  routerLogin,
};
