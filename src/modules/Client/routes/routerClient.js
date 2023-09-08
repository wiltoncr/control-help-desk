const express = require( 'express');
const { controllerClient }  = require( '../controllers/index.js');

const routerClient = express.Router();

routerClient.get('/', async (req, res) => {
    const clients = await controllerClient.getAllData();
    res.render('clients', {clients, page: 'client'});
});
 
routerClient.post('/createClient', (req, res) => controllerClient.createClient(req, res))

routerClient.delete('/deleteClientById', (req, res) => controllerClient.delete(req, res));

routerClient.get('/getClient',(req, res)  => controllerClient.getAll(req, res) )

routerClient.get('/getClientById', (req, res) => controllerClient.getClientById(req, res))

routerClient.get('/getClientByDesc', (req, res)=> controllerClient.getClientByDesc(req, res))

module.exports = {routerClient};