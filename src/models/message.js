const {query} = require('../helpers/actionQuery')

exports.insertMessage = (data) => {
    return query('INSERT INTO chatmessage SET ?', data)
}

exports.getAllMessage = () => {
    return query('SELECT * FROM chatmessage')
}

exports.receiverMessage = (id) => {
    return query('SELECT chatmessage.*, users.id, users.name FROM chatmessage INNER JOIN users ON chatmessage.receiverId = users.id WHERE receiverId = ?', id)
}

exports.senderMessage = (id) => {
    return query('SELECT chatmessage.*, users.id, users.name FROM chatmessage INNER JOIN users ON chatmessage.senderId = users.id WHERE senderId = ?', id)
}