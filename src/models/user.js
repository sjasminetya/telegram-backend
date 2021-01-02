const {query} = require('../helpers/actionQuery')

exports.register = (data) => {
    return query('INSERT INTO users SET ?', data)
}

exports.checkUser = (email) => {
    return query('SELECT * FROM users WHERE email = ?', email)
}

exports.update = (data, id) => {
    return query('UPDATE users SET ? WHERE id = ?', [data, id])
}

exports.getUserLogin = (id) => {
    return query('SELECT * FROM users WHERE id = ?', id)
}

exports.getFriends = (id) => {
    return query('SELECT * FROM users WHERE id != ?', id)
}

exports.messageFriends = (id) => {
    return query('SELECT * FROM users WHERE id = ?', id)
}

exports.allUser = (name) => {
    return query('SELECT * FROM users WHERE name LIKE ?', `%${name}%`)
}