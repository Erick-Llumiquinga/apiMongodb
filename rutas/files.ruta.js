;
'use strict'
const express = require('express'),
      multiParty = require('connect-multiparty');

let api = express.Router(),
    filesControl = require('../controles/file.control'),
    galeriaMiddleware = multiParty({uploadDir: "./files/galeria"}),
    pdfMiddleware = multiParty({uploadDir: "./files/pdf"});

api.post('/upload_galeria', galeriaMiddleware, filesControl.uploadData)
api.post('/upload_pdf', pdfMiddleware, filesControl.uploadData)
api.put('/update_galeria', galeriaMiddleware, filesControl.updateFile)
api.get('/find_file/:urlFile', filesControl.verFile)
api.delete('/delete_file', filesControl.deleteFile)

module.exports = api    