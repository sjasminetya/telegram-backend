require('dotenv').config()
const http = require('http')
const express = require('express')
const socket = require('socket.io')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()
const server = http.createServer(app)
const io = socket(server, {
    cors: {
        origin: '*'
    }
})
const PORT = process.env.PORT
const cors = require('cors')
const routerMain = require('./src/router/index')
const {insertMessage} = require('./src/models/message')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/upload', express.static('./uploads'))

// const users = []
io.on('connection', (socket) => {
    console.log('connection', socket.id)
 
    socket.on('initialUser', (data) => {
        console.log(data.senderId)
        socket.join('senderId:'+data.senderId)
        socket.broadcast.to('senderId:'+data.senderId).emit('kirimKembali', `Both: ${data.senderId} join chat`)

        // io.emit('initialUser', name)
    })

    socket.on('receiverMessage', (data) => {
        console.log(data)
        const formatMessage = {
            message: data.message,
            senderId: data.senderId,
            receiverId: data.receiverId
        }
        console.log(formatMessage)
        io.to('senderId:' + data.senderId).emit('kirimKembali', formatMessage)
        socket.emit('kirimKembali', formatMessage)
    })

    socket.on('disconnect', () => {
        console.log('user left')
    })
})

app.use('/v1', routerMain)

app.use((req, res, next) => {
    const err = new Error('URL Not found')
    err.status = 404
    next(err)
})
  
app.use((err, req, res, next) => {
    res.status(500)
    res.send({
      error: {
        status: 500,
        message: err.message
      }
    })
})

server.listen(PORT, () => console.log(`Server running in port: ${PORT}`))