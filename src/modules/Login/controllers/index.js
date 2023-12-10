
const { loginRepo } = require("../repo/index.js");
const { LoginController } = require("./LoginController.js");

const controlerLogin = new LoginController(loginRepo)

module.exports = {
    controlerLogin
}
