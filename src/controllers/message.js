const {insertMessage, receiverMessage, senderMessage, getAllMessage, historyMessage} = require('../models/message')
const { v4: uuidv4 } = require('uuid')
const {response, reject} = require('../helpers/helpers')
const moment = require('moment')

exports.insertMessage = (req, res) => {
    const {senderId, receiverId, message} = req.body
    const id = uuidv4()
    const data = {
        id,
        senderId,
        receiverId,
        message,
        time: moment(new Date()).format('LT')
    }
    insertMessage(data)
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

exports.senderMessage = (req, res) => {
    const id = req.params.id
    senderMessage(id)
    .then(result => {
        const resultMessage = result
        if (resultMessage.length === 0) {
            return reject(res, {message: 'cant get message'}, 404, null)
        }
        response(res, resultMessage, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.receiverMessage = (req, res) => {
    const id = req.params.id
    receiverMessage(id)
    .then(result => {
        const resultMessage = result
        if (resultMessage.length === 0) {
            return reject(res, {message: 'cant get message'}, 404, null)
        }
        response(res, resultMessage, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getAllMessage = (req, res) => {
    getAllMessage()
    .then(result => {
        const resultMessage = result
        if (resultMessage.length === 0) {
            return reject(res, {message: 'cant get message'}, 404, null)
        }
        response(res, resultMessage, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.historyMessage = (req, res) => {
    const senderId = req.params.senderId
    const receiverId = req.params.receiverId
    historyMessage(senderId, receiverId)
    .then(result => {
        console.log(senderId)
        console.log(receiverId)
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