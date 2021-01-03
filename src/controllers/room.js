const {createGroup, getGroup} = require('../models/room')
const { v4: uuidv4 } = require('uuid')
const {reject, response} = require('../helpers/helpers')
const { get } = require('../router')

exports.createGroup = (req, res) => {
    const id = uuidv4()
    const {nameRoom, userId} = req.body
    const data = {
        id,
        nameRoom,
        userId,
        imgRoom: `${process.env.BASE_URL_IMG}/upload/avatar.jpg`
    }
    createGroup(data)
    .then(result => {
        const resultRoom = result
        if (resultRoom === 0) {
            reject(res, null, 404, {message: 'cant create group'})
        }
        response(res, {message: 'success create group'}, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getGroup = (req, res) => {
    const userId = req.params.userId
    getGroup(userId)
    .then(result => {
        const resultRoom = result
        if (resultRoom === 0) {
            reject(res, null, 404, {message: 'cant create group'})
        }
        response(res, resultRoom, 200, null)
    })
    .catch(err => {
        console.log(err)
    })
}