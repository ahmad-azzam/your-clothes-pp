const { User } = require('../models/index');
const { checkPassword } = require('../helpers/password');
class AuthController {
    static login(req, res) {
        let message
        if (req.query.errors) {
            message = req.query.errors
        }
        res.render('auth/login', { message })
    }
    static cekLogin(req, res) {
        const { email, password } = req.body
        User
            .findOne({
                where: {
                    email
                }
            })
            .then(data => {
                if (data) {
                    const isPasswordMatch = checkPassword(password, data.password)
                    if (isPasswordMatch) {
                        req.session.isLogin = true
                        req.session.role = data.role
                        req.session.userId = data.id
                        if (data.role === 'admin') {
                            res.redirect('/admin')
                        } else if (data.role === 'user') {
                            res.redirect('/user')
                        }
                    } else {
                        res.redirect('/login?errors=Email or Password is Wrong')
                    }
                } else {
                    res.redirect('/login?errors=Email or Password is Wrong')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }
    static register(req, res) {
        let message
        if (req.query.errors) {
            message = req.query.errors.split(',')
        }
        res.render('auth/register', { message })
    }
    static addUser(req, res) {
        const { name, email, password, phone } = req.body
        User
            .create({
                name, email, password, phone
            })
            .then(_ => {
                res.redirect('/login')
            })
            .catch(err => {
                const validation = err.errors.map(el => el.message)
                res.redirect(`/register?errors=${validation}`)
            })
    }
    static logout(req, res) {
        req.session.isLogin = false
        req.session.role = null
        res.redirect('/login')
    }
}
module.exports = AuthController