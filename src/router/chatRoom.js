const express = require('express')
const router = express.Router()
const {insertMessageGroup, historyMessageGroup, getNameJoinRoom} = require('../controllers/chatRoom')

router
    .post('/insert', insertMessageGroup)
    .get('/history', historyMessageGroup)
    .get('/', getNameJoinRoom)

module.exports = router