const { Clothes, UserClothes, User } = require('../models/index');
const { Op } = require("sequelize");

class UserController {
    static showClothes(req, res) {
        Clothes
            .findAll({
                where: {
                    stock: {
                        [Op.gt]: 0
                    }
                },
                order: [
                    ['id', 'ASC']
                ]
            })
            .then(data => {
                res.render('user/user', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static userBuy(req, res) {
        Clothes
            .decrement('stock', {
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                return UserClothes
                    .create({
                        UserId: req.session.userId,
                        ClothesId: data[0][0][0].id,
                        totalPrice: data[0][0][0].price,
                        status: 'Dalam Konfirmasi'
                    })
            })
            .then(_ => {
                res.redirect('/user')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static userTransaction(req, res) {
        User
            .findByPk(req.session.userId, {
                include: [
                    { model: Clothes }
                ]
            })
            .then(data => {
                res.render('user/transaction', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
}
module.exports = UserController