const express = require('express')
const router = express.Router()
const {insertMessage, getAllMessage, historyMessage} = require('../controllers/message')

router
    .post('/send', insertMessage)
    .get('/', getAllMessage)
    .get('/history/:senderId/:receiverId', historyMessage)

module.exports = router