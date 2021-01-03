const {query} = require('../helpers/actionQuery')

exports.insertMessage = (data) => {
    return query('INSERT INTO chatmessage SET ?', data)
}

exports.getAllMessage = () => {
    return query('SELECT * FROM chatmessage')
}

exports.historyMessage = (senderId, receiverId) => {
    return query(`SELECT sender.name AS sendername, receiver.name AS receivername, chatmessage.senderId, chatmessage.receiverId, chatmessage.message, chatmessage.time FROM chatmessage LEFT JOIN users AS sender ON chatmessage.senderId = sender.id LEFT JOIN users AS receiver ON chatmessage.receiverId = receiver.id WHERE (chatmessage.senderId = '${senderId}' OR chatmessage.senderId = '${receiverId}') AND (chatmessage.receiverId = '${receiverId}' OR chatmessage.receiverId = '${senderId}') ORDER BY chatmessage.time ASC`)
}