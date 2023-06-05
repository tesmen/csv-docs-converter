import express from 'express'
import * as path from 'path'
import converterApp from './ConverterApp.js'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const server = express()

server.get('/', (req, res) => {
    res.sendFile(path.resolve('src', 'pages', 'form.html'))
})

server.post('/convert', upload.single('convert_file'), (req, res) => {
    let file
    if(req.file) {
        file = converterApp.processFile(path.resolve(req.file.path))
    }

    if(file) {
        res.download(file)
    }
})

export default server
