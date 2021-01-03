const express = require('express')
const router = express.Router()
const routerUsers = require('./user')
const routerMessage = require('./message')
const routerRoom = require('./room')
const routerChatRoom = require('./chatRoom')

router
    .use('/users', routerUsers)
    .use('/message', routerMessage)
    .use('/room', routerRoom)
    .use('/chat-room', routerChatRoom)

module.exports = router