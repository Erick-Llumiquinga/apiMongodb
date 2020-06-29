; 
'use strict';

const express = require('express'),
      bodyParse = require('body-parser'),
      connectDB = require('../config/db');

let app = express(),
    usuarioRuta = require('../rutas/usuario.ruta'),
    fileRuta = require('../rutas/files.ruta'),
    db = connectDB()

app.use(bodyParse.urlencoded({
    extended: false
}));

app.use(bodyParse.json());

app.use('/api', usuarioRuta)
app.use('/api', fileRuta)

module.exports = app;