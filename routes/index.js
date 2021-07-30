const router = require('express').Router();
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const adminRoute = require('./adminRoute');

router.get('/', (req, res) => {
    res.render('index')
})
router.use('/', authRoute)
router.use('/user', checkLogin, checkUser, userRoute)
router.use('/admin', checkLogin, checkAdmin, adminRoute)


function checkLogin(req, res, next) {
    if (req.session.isLogin === true) {
        next()
    } else {
        res.redirect('/login')
    }
}

function checkAdmin(req, res, next) {
    if (req.session.role === 'admin') {
        next()
    } else if (req.session.role === 'user') {
        res.redirect('/user')
    } else {
        res.redirect('/login')
    }
}
function checkUser(req, res, next) {
    if (req.session.role === 'user') {
        next()
    } else if (req.session.role = 'admin') {
        res.redirect('/admin')
    } else {
        res.redirect('/login')
    }
}

// router.get('/clothes', checkLogin, checkAdmin, Controller.showClothes)
// router.get('/clothes/add', Controller.getAddClothes)
// router.post('/clothes/add', Controller.postAddClothes)
// // router.get('/clothes/edit', Controller.getEditClothes)
// // router.post('/clothes/edit', Controller.postEditClothes)
// router.get('/clothes/delete/:id', Controller.deleteClothes)
module.exports = router
