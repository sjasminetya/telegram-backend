const express = require('express')
const router = express.Router()
const {insertMessage, getAllMessage, historyMessage, deleteHistoryMessage, lastMessage} = require('../controllers/message')

router
    .post('/send', insertMessage)
    .get('/', getAllMessage)
    .get('/last-message/:senderId', lastMessage)
    .get('/history/:senderId/:receiverId', historyMessage)
    .delete('/delete/:senderId/:receiverId', deleteHistoryMessage)

module.exports = router