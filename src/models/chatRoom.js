const {query} = require('../helpers/actionQuery')

exports.insertMessageGroup = (data) => {
    return query('INSERT INTO chatRoom SET ?', data)
}

exports.historyMessageGroup = () => {
    return query(`SELECT sender.name AS sendername, sender.photoProfile, chatRoom.senderId, chatRoom.message, chatRoom.time, room.userId, room.nameRoom FROM chatRoom LEFT JOIN users AS sender ON chatRoom.senderId = sender.id INNER JOIN room ON room.userId = sender.id ORDER BY chatRoom.time ASC`)
}

exports.getNameJoinRoom = (nameRoom) => {
    return query(`SELECT users.id, users.name FROM room INNER JOIN users ON room.userId = users.id WHERE room.nameRoom LIKE ?`, `%${nameRoom}%`)
}