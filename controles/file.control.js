; 
'use strict'

const connectDB = require('../config/db'),
      fs = require('fs'),
      path = require('path');
const { ObjectId } = require('mongodb');

let uploadData = async (req,res) => {
    let db = await connectDB(),
        file = req.files.file

    if(file.originalFilename == "" || !file.originalFilename)
    {
        fs.unlinkSync(file.path)
        .then(() => {
            db.collection('archivos').deleteOne({'nombre': file.originalFilename})
            .then(data => {
                return res.status(200).json({
                    transaction: true,
                    data,
                    msg: "Archivo borrado"
                }) 
            })
            .catch(err => {
                return res.status(500).json({
                    transaction: false,
                    data: null,
                    msg: "Archivo no encontrado"
                }) 
            })
        })
        
    }
    else {
        let url = file.path;
            url = url.split('\\');
        let urlFiles = [{'nombre': url[url.length -1]}];
        db.collection('archivos').insertMany(urlFiles)
        .then(data => {
            return res.status(200).json({
                transaction: true,
                data,
                msg: "Archivo guardado"
            }) 
        })  
        .catch(err => {
            return res.status(500).json({
                transaction: false,
                data: err,
                msg: "Archivo no guardado"
            }) 
        })
    }
}

let verFile = (req, res) => {
    let urlFile = req.params.urlFile
    let pathfile = `./files/galeria/${urlFile}`
    fs.exists(pathfile, (exists)  => {

        if(exists) {
            return res.status(200).sendFile(path.resolve(pathfile))
        }else {
            return res.status(400).send('No existe')
        }
    })
}

let updateFile = async (req, res) => {
    let db = await connectDB(),
        file = req.files.file,
        id = new ObjectId(req.body.id)

    if(file.originalFilename == "" || !file.originalFilename)
    {
        fs.unlinkSync(file.path)
        .then(() => {
            db.collection('archivos').deleteOne({'nombre': file.originalFilename})
            .then(data => {
                return res.status(200).json({
                    transaction: true,
                    data,
                    msg: "Archivo borrado"
                }) 
            })
            .catch(err => {
                return res.status(500).json({
                    transaction: false,
                    data: null,
                    msg: "Archivo no encontrado"
                }) 
            })
        })
        
    }
    else {
        let url = file.path;
            url = url.split('\\');
        let urlFiles = url[url.length -1];
        db.collection('archivos').find({'_id': id}).toArray()
        .then(data => {
            fs.unlinkSync(`files/galeria/${data[0].nombre}`)
            db.collection('archivos').updateOne({'_id': id}, {$set: {'nombre': urlFiles}})
            .then(data => {
                res.status(200).json({
                    transaction: true,
                    data,
                    msg: 'Archivos acualizados'
                })
            })
            .catch(err => {
                res.status(400).json({
                    transaction: true,
                    data: err,
                    msg: 'Archivos no actualizados'
                })
            })   
        })
    }
}

let deleteFile = async (req, res) => {
    let db = await connectDB(),
        id = new ObjectId(req.query.id)
    db.collection('archivos').find({'_id': id}).toArray()
    .then(data => {
        fs.unlinkSync(`files/galeria/${data[0].nombre}`)
        db.collection('archivos').deleteOne({'_id': id})
        .then(data => {
            return res.status(200).json({
                transaction: true,
                data,
                msg: 'Archivo eliminado'
            })
        })
    })
    .catch(err => {
        return res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

module.exports = {
    uploadData,
    verFile,
    updateFile,
    deleteFile
} 