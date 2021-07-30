const UserController = require('../controllers/userController');
const router = require('express').Router();

router.get('/', UserController.showClothes)
router.get('/:id/buy', UserController.userBuy)
router.get('/transaction', UserController.userTransaction)

module.exports = router