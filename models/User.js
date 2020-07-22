const connection = require('../conf');
const User = {};

User.findByEmailAndPassword = (email, password, callback) => {
  connection.query(
    `SELECT * FROM users WHERE email = ?`,
    email,
    (err, results, fields) => callback(err, results ? results[0] : null, fields)
  )
}

User.getAll = (callback) => {
  connection.query(
    `SELECT id, email FROM users`,
    (err, results, fields) => callback(err, results, fields)
  )
}

module.exports = User;