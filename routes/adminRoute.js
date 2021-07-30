const router = require('express').Router()
const AdminController = require('../controllers/adminController')

router.get('/', AdminController.chartUser)
// Router Untuk Clothes
router.get('/clothes', AdminController.showClothes)
router.get('/clothes/add', AdminController.getAddClothes)
router.post('/clothes/add', AdminController.postAddClothes)
router.get('/clothes/edit/:id', AdminController.getEditClothes)
router.post('/clothes/edit/:id', AdminController.postEditClothes)
router.get('/clothes/delete/:id', AdminController.deleteClothes)
// Router Untuk Transaction
router.get('/transaction', AdminController.allTransaction)
router.get('/transaction/list/:id', AdminController.listTransaction)
router.get('/transaction/list/:idClothes/accept/:idUser', AdminController.acceptTransaction)
router.get('/transaction/list/:idClothes/decline/:idUser', AdminController.declineTransaction)
module.exports = router