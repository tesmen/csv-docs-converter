import express from 'express'
import * as path from 'path'
import converterApp from './ConverterApp.js'

const server = express()

server.get('/', (req, res) => {
    res.sendFile(path.resolve('src', 'pages', 'example.html'))
})

server.post('/convert', (req, res) => {
    converterApp.logger.error('Hi!')
    res.send('convert')
})

export default server
