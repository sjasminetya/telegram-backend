const express = require('express')
const router = express.Router()
const {register, login, getFriends, getUserLogin, updateUser, messageFriends, allUser} = require('../controllers/user')
const {update} = require('../models/user')
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../middleware/upload')
const {verifyAccess} = require('../middleware/auth')

router.get('/', allUser)
router.get('/:id', getUserLogin)
router.get('/friends/:id', getFriends)
router.get('/friends/message/:id', messageFriends)
router.patch('/:id', verifyAccess, uploadFile.single('photoProfile'), updateUser)
router.patch('/image/:id', verifyAccess, uploadFile.single('photoProfile'), updateUser)
router.post('/login', login)
router.post('/register', uploadFile.single('photoProfile'), register)
router.get('/confirmation/:id/:token', async (req, res) => {
    try {
        jwt.verify(req.params.token, process.env.SECRET_KEY)
        const isActive = 1
        const data = {}
        if (isActive) {data.isActive = isActive}
        const id = req.params.id
        await update({isActive: 0}, id)
        return res.redirect(`${process.env.URL_LOGIN}`)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router