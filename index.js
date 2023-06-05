import server from './src/Server.js'

const port = 3099

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
