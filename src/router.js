const express = require('express');
const { routerLogin } = require('./modules/Login/routes/routerLogin');
const { routerUsers } = require('./modules/User/routes/routerUsers');
const { routerCompanys } = require('./modules/Company/routes/routerCompanys');
const { routerAccess } = require('./modules/Access/routes/routerAccess');
const { routerClient } = require('./modules/Client/routes/routerClient');

const router = express.Router();

router.use('/login', routerLogin);

router.use('/user', routerUsers);
router.use('/client', routerClient);
router.use('/company', routerCompanys);
router.use('/access', routerAccess);

module.exports = { router };
