const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function hashPassword(pass) {
    return bcrypt.hashSync(pass, salt)
}

function checkPassword(pass, hash) {
    return bcrypt.compareSync(pass, hash)
}

module.exports = { hashPassword, checkPassword }