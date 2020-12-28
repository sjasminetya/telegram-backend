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

exports.historyMessage = (senderId, receiverId) => {
    return query(`SELECT sender.name AS sendername, receiver.name AS receivername, chatmessage.senderId, chatmessage.receiverId, chatmessage.message, chatmessage.time FROM chatmessage LEFT JOIN users AS sender ON chatmessage.senderId = sender.id LEFT JOIN users AS receiver ON chatmessage.receiverId = receiver.id WHERE (chatmessage.senderId = '${senderId}' OR chatmessage.senderId = '${receiverId}') AND (chatmessage.receiverId = '${receiverId}' OR chatmessage.receiverId = '${senderId}')`)
}