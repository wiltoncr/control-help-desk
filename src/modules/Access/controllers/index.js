const { accessRepo } = require('../repo/index');
const { AccessController } = require('./AccessController');

const controllerAccess = new AccessController(accessRepo);

module.exports = {
  controllerAccess,
};
