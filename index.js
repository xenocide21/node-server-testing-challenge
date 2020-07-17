const express = require('express')
const cors = require('cors')
const carsRouter = require('./cars/cars-router')

const server = express()
const port = process.env.PORT || 5000

server.use(cors())
server.use(express.json())

server.use('/cars', carsRouter)

server.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my cars API'
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'Please try again later'
    })
})

if (!module.parent) {
    server.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`)
    })
}

module.exports = server