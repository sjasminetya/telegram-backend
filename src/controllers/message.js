const {insertMessage, receiverMessage, senderMessage} = require('../models/message')
const { v4: uuidv4 } = require('uuid')
const {response, reject} = require('../helpers/helpers')

exports.insertMessage = (req, res) => {
    const {senderId, receiverId, message} = req.body
    const id = uuidv4()
    const data = {
        id,
        senderId,
        receiverId,
        message,
        time: new Date()
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