
const { clientRepo }  = require( "../repo/index.js");
const { ClientController }  = require( "./ClientController.js");

const controllerClient = new ClientController(clientRepo);

module.exports = {  
    controllerClient
}
