const express = require('express')
const router = express.Router()
const {createGroup, getGroup} = require('../controllers/room')
const { uploadFile } = require('../middleware/upload')

router
    .post('/createRoom', uploadFile.single('imgRoom'), createGroup)
    .get('/:userId', getGroup)
    .get('/message/:userId', getGroup)

module.exports = router