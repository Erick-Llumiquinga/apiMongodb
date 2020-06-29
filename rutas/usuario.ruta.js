;
'use strict'
const express = require('express');

let api = express.Router(),
    usuarioControl = require('../controles/usuarios.control');

api.get('/prueba', usuarioControl.prueba)
api.get('/getUser', usuarioControl.getAll)
api.post('/insertMany', usuarioControl.insertDataMany)
api.post('/insertOne', usuarioControl.insertData)
api.put('/updateOne', usuarioControl.updateData)
api.put('/updateMany', usuarioControl.updateDataMany)
api.get('/findOne', usuarioControl.getById)
api.get('/findElement', usuarioControl.getByElement)
api.delete('/deleteElement', usuarioControl.deleteData)


/*api.get('/postman_Query', usuarioControl.posmanQuery)
api.get('/postman_Params/:nombre/:apellido/:edad', usuarioControl.posmanParams)
api.post('/postman_Body', usuarioControl.posmanBody)*/

module.exports = api;