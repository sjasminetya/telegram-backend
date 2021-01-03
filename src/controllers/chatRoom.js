const {insertMessageGroup, historyMessageGroup, getNameJoinRoom} = require('../models/chatRoom')
const { v4: uuidv4 } = require('uuid')
const {response, reject} = require('../helpers/helpers')

exports.insertMessageGroup = (req, res) => {
    const {senderId, message} = req.body
    const id = uuidv4()
    const data = {
        id,
        senderId,
        message,
        time: new Date()
    }
    insertMessageGroup(data)
    .then(result => {
        const resultMessage = result
        if (resultMessage.length === 0) {
            return reject(res, {message: 'cant insert message'}, 404, null)
        }
        response(res, {message: 'success'}, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.historyMessageGroup = (req, res) => {
    historyMessageGroup()
    .then(result => {
        const resultMessage = result
        if (resultMessage.length === 0) {
            return reject(res, {message: 'id user not found'}, 404, null)
        }
        response(res, resultMessage, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getNameJoinRoom = (req, res) => {
    const nameRoom = req.query.nameRoom
    getNameJoinRoom(nameRoom)
    .then(result => {
        const resultMessage = result
        if (resultMessage.length === 0) {
            return reject(res, {message: 'cant get'}, 404, null)
        }
        response(res, resultMessage, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}