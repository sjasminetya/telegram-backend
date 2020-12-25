const express = require('express')
const router = express.Router()
const routerUsers = require('./user')
const routerMessage = require('./message')

router
    .use('/users', routerUsers)
    .use('/message', routerMessage)

module.exports = router