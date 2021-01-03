const {query} = require('../helpers/actionQuery')

exports.createGroup = (data) => {
    return query('INSERT INTO room SET ?', data)
}

// exports.getGroup = (userId) => {
//     return query('SELECT * FROM room WHERE userId = ?', userId)
// }

exports.getGroup = (userId) => {
    return query('SELECT room.*, users.id, users.name FROM room INNER JOIN users ON room.userId = users.id WHERE room.userId = ?', userId)
}