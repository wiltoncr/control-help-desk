const express = require('express');
const { routerLogin } = require('./modules/Login/routes/routerLogin.js');
const { routerUsers } = require('./modules/User/routes/routerUsers.js');
const { routerCompanys } = require('./modules/Company/routes/routerCompanys.js');
const { routerAccess } = require('./modules/Access/routes/routerAccess.js');
const { routerClient } = require('./modules/Client/routes/routerClient.js');


const router = express.Router();

router.use('/login', routerLogin);

router.use('/user', routerUsers);
router.use('/client', routerClient);
router.use('/company', routerCompanys);
router.use('/access', routerAccess);


module.exports = { router };