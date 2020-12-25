const connection = require('../configs/db')

exports.query = (...arg) => {
    return new Promise((resolve, reject) => {
        connection.query(...arg, (error, results) => {
            if (!error) {
                resolve(results)
            } else {
                console.log('error disini', error)
                reject(error)
            }
        })
    })
}