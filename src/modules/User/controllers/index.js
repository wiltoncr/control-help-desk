const { userRepo } = require('../repo');
const { UserController } = require('./UserController');

const controlerUser = new UserController(userRepo);

module.exports = {
  controlerUser,
};
