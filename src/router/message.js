const express = require('express')
const router = express.Router()
const {insertMessage, receiverMessage, senderMessage} = require('../controllers/message')

router
    .get('/receiver/:id', receiverMessage)
    .post('/send', insertMessage)
    .get('/sender/:id', senderMessage)

module.exports = router