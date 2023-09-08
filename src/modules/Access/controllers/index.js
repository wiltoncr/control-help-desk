
const { accessRepo }  = require( "../repo/index.js");
const { AccessController }  = require( "./AccessController.js");

const controllerAccess = new AccessController(accessRepo);

module.exports = {  
    controllerAccess
}
