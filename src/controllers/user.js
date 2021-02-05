const {register, checkUser, update, getFriends, getUserLogin, messageFriends, allUser} = require('../models/user')
const {response, reject} = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
})

exports.register = async (req, res, next) => {
    const id = uuidv4()
    const {username, name, email, password, bio, phoneNumber, lat, lng} = req.body

    const resultCheck = await checkUser(email)
    if (resultCheck.length > 0) return reject(res, null, 400, {message: 'email already exists'})

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const data = {
                id,
                username: 'username',
                name,
                email,
                password: hash,
                bio: 'bio',
                phoneNumber: 081,
                photoProfile: `${process.env.BASE_URL_IMG}/upload/avatar.jpg`,
                isActive: 1,
                status: 'offline',
                lat,
                lng
            }

            await register(data)
            try {
                jwt.sign({id: data.id, email: data.email}, process.env.SECRET_KEY, {expiresIn: '24h'}, function (err, emailToken) {
                    const url = `${process.env.BASE_URL}/users/confirmation/${data.id}/${emailToken}`
                    delete data.password
                    
                    transporter.sendMail({
                        to: data.email,
                        subject: 'Team Telegram Web App, confirm your email',
                        html: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                            <style>
                                  .container {
                                      color: #000;
                                  }
                                  button {
                                      width: 200px;
                                      height: 70px;
                                      background-color: #6379F4;
                                      border-radius: 10px;
                                      border: none;
                                      color: #ffffff !important;
                                  }
                                  button a {
                                      text-decoration: none;
                                      color: #fff !important;
                                  }
                                  button:hover {
                                      outline: none;
                                  }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="text-email">
                                  <p>You recently register into Telegram App. Please click this link to activation your account</p>
                                  <button><a href="${url}">Activation your account</a></button>
                                  <p>Thanks,<br>Telegram Team</p>
                                  <p>P.S. We also love hearing from you and helping you with any issues yo have. Please reply to this email if you want to ask a question or just say hi.</p>
                                </div>
                            </div>
                        </body>
                        </html>`
                    })

                    return response(res, {message: 'Success register, please check your email to verify'}, 200, null)
                })
            } catch (err) {
                console.log(err)
            }
        })
    })
}

exports.login = async (req, res) => {
    const {email, password} = req.body
    
    const get = await checkUser(email)
    try {
        const user = get[0]
        if (user !== undefined && user.length !== 0) {
            if (user.isActive === 1) return reject(res, null, 401, {error: 'please confirm your email to login'})

            bcrypt.compare(password, user.password, function (err, resCheck) {
                if (!resCheck) return reject(res, null, 401, {error: 'Login failed, wrong password'})
                delete user.password

                jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY, {expiresIn: '24h'}, function (err, token) {
                    user.token = token
                    return response(res, user, 200, null)
                })
            })
        } else {
            return reject(res, null, 404, {message: 'email and password cannot be empty'})
        }
    } catch (error) {
        console.log(error)
    }
}

exports.updateUser = (req, res) => {
    const id = req.params.id
    const {username, name, email, password, bio, phoneNumber} = req.body
    let photoProfile = null
    let lat = null
    let lng = null

    console.log('masuk sini?')
    if (req.file) {
        photoProfile = `${process.env.BASE_URL_IMG}/upload/${req.file.filename}`
    }

    const data = {}

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (username) { data.username = username }

            if (name) { data.name = name }

            if (email) { data.email = email }

            if (password) { data.password = hash }

            if (bio) { data.bio = bio }

            if (phoneNumber) { data.phoneNumber = phoneNumber }

            if (photoProfile) { data.photoProfile = photoProfile }

            if (lat) { data.lat = lat }

            if (lng) { data.lng = lng }
        
        update(data, id)
            .then(result => {
                const resultDataUser = result
                if (resultDataUser.length === 0) {
                    return reject(res, {message: 'cant update data'}, 404, null)
                }
                response(res, {message: 'data successfull update'}, 200, null)
            })
            .catch(err => {
                console.log('ada error di controller update', err)
            })
        })
    })
}

exports.getFriends = (req, res) => {
    const id = req.params.id
    getFriends(id)
    .then(result => {
        const resultDataUser = result
        if (resultDataUser.length === 0) {
            return reject(res, {message: 'id not found'}, 404, null)
        }
        response(res, resultDataUser, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.messageFriends = (req, res) => {
    const id = req.params.id
    messageFriends(id)
    .then(result => {
        const resultDataUser = result
        if (resultDataUser.length === 0) {
            return reject(res, {message: 'id not found'}, 404, null)
        }
        response(res, resultDataUser, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getUserLogin = (req, res) => {
    const id = req.params.id
    getUserLogin(id)
    .then(result => {
        const resultDataUser = result
        if (resultDataUser.length === 0) {
            return reject(res, {message: 'id user not found'}, 404, null)
        }
        response(res, resultDataUser, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.allUser = (req, res) => {
    const name = req.query.name || null
    allUser(name)
    .then(result => {
        const resultDataUser = result
        if (resultDataUser === 0) {
            return reject(res, {message: 'cant get data user'}, 4040, null)
        }
        response(res, resultDataUser, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}