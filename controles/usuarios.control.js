; 
'use strict'

const connectDB = require('../config/db'),
      fs = require('fs');
const { ObjectId } = require('mongodb');

let prueba = (req, res) => {
   res.status(200).send('Hola Api') 
}

let getAll = async (req, res) => {
    let db = await connectDB();
    db.collection('usuarios').find().toArray()
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let getById = async (req, res) => {
    let db = await connectDB(),
        id = new ObjectId(req.query.id)
    db.collection('usuarios').find({'_id': id}).toArray()
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let getByElement = async (req, res) => {
    let db = await connectDB()
    var campos = req.query.campo
    let elemento = req.query.elemento

    db.collection('usuarios').find({'nombre': elemento}).toArray()
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let insertData = async (req, res) => {
    let db = await connectDB();
    let data = req.body.data
    db.collection('usuarios').insert(data)
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos guardados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let insertDataMany = async (req, res) => {
    let db = await connectDB();
    let arrayPersons = req.body.arrayPersons
    db.collection('usuarios').insertMany(arrayPersons)
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos guardados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let updateData = async (req, res) => {
    let db = await connectDB();
    let datas = req.body
    db.collection('usuarios').updateOne({'_id': new ObjectId(datas.id) }, {$set: datas.datosACambiar})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos actualizados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let updateDataMany = async (req, res) => {
    let db = await connectDB();
    let data = req.body
    db.collection('usuarios').updateMany({"sexo": data.sexo},{$set: {"edad": data.edad, "direccion": "Quito"}})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos actualizados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let updateDataManyTemporal = async (req, res) => {
    let db = await connectDB();
    let datas = req.body

    datas.forEach(element => {
        db.collection('usuarios').updateOne({},{$set: {datas}})
        .then(data => {
            res.status(200).json({
                transaction: true,
                data,
                msg: 'datos actualizados..'
            })
        })
        .catch(err => {
            res.status(500).json({
                transaction: false,
                data: null,
                msg: `El error es: ${err}`
            })
        })
    });
}


let deleteData = async (req, res) => {
    let db = await connectDB();
    let id = new ObjectId(req.body._id)
    db.collection('usuarios').deleteOne({ '_id': id})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos actualizados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

/*let posmanQuery = async (req, res) => {
    let nombre  = req.query.nombre,
        apellido = req.query.apellido
        edad = req.query.edad,
        persona = req.query

    console.log(req)
    console.log(persona)
    let data = {
        nombre,
        apellido,
        edad 
    }    

    res.status(200).json({
        transaction: true,
        data,
        msg: 'muy bien'
    })
}

let posmanParams = async (req, res) => {
    let nombre  = req.params.nombre,
    apellido = req.params.apellido
    edad = req.params.edad,
    persona = req.params

    console.log(persona)
    let data = {
        nombre,
        apellido,
        edad 
    }  

    res.status(200).json({
        transaction: true,
        data,
        msg: 'muy bien'
    })
}

let posmanBody = async (req, res) => {
    let nombre  = req.body.nombre,
    apellido = req.body.apellido
    edad = req.body.edad,
    persona = req.body

    console.log(persona)
    let data = {
        nombre,
        apellido,
        edad 
    } 
    res.status(200).json({
        transaction: true,
        data,
        msg: 'muy bien'
    })
}*/

module.exports = {
    prueba,
    getAll,
    insertDataMany,
    insertData,
    updateData,
    updateDataMany,
    getById,
    getByElement,
    deleteData,
   /*posmanQuery,
    posmanParams,
    posmanBody*/
}