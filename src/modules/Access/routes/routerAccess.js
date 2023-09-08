const express = require( 'express');
const { controllerAccess }  = require( '../controllers/index.js');

const routerAccess = express.Router();

routerAccess.get('/', async (req, res) => {
    
    res.render('access', {page: 'access' });
});
 
routerAccess.post('/createAccess', (req, res) => controllerAccess.createAccess(req, res));

routerAccess.delete('/deleteAccessById', (req, res) => controllerAccess.delete(req, res));

routerAccess.get('/getAccess',(req, res)  => controllerAccess.getAll(req, res) )

routerAccess.get('/getAccessById', (req, res) => controllerAccess.getAccessById(req, res))

routerAccess.get('/getAccessByDesc', (req, res)=> controllerAccess.getAccessByDesc(req, res))

module.exports = {routerAccess};