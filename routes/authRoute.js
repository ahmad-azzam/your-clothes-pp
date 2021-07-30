const AuthController = require('../controllers/authController');
const router = require('express').Router();

router.get('/login', AuthController.login)
router.post('/login', AuthController.cekLogin)
router.get('/register', AuthController.register)
router.post('/register', AuthController.addUser)
router.get('/logout', AuthController.logout)

module.exports = router