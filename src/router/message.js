const express = require('express')
const router = express.Router()
const {insertMessage, receiverMessage, senderMessage, getAllMessage, historyMessage} = require('../controllers/message')

router
    .get('/receiver/:id', receiverMessage)
    .post('/send', insertMessage)
    .get('/sender/:id', senderMessage)
    .get('/', getAllMessage)
    .get('/history/:senderId/:receiverId', historyMessage)

module.exports = router