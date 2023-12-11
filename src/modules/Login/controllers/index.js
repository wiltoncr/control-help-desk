const { loginRepo } = require('../repo');
const { LoginController } = require('./LoginController');

const controlerLogin = new LoginController(loginRepo);

module.exports = {
  controlerLogin,
};
