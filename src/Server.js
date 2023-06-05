import express from 'express'
import * as path from 'path'
import converterApp from './ConverterApp.js'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

const server = express()

server.get('/', (req, res) => {
    res.sendFile(path.resolve('src', 'pages', 'convert.html'))
})

server.post('/convert', upload.single('convert_file'), (req, res) => {
    console.log(req.file)
    res.send('convert')
    converterApp.processFiles()
})

export default server
