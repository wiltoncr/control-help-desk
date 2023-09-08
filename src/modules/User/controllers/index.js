
const { userRepo } = require("../repo/index.js");
const { UserController } = require("./UserController.js");

const controlerUser = new UserController(userRepo)

module.exports = {
    controlerUser
}
