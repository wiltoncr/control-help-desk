const { clientRepo } = require('../repo/index');
const { ClientController } = require('./ClientController');

const controllerClient = new ClientController(clientRepo);

module.exports = {
  controllerClient,
};
