const { Clothes, User, UserClothes } = require('../models/index')


class AdminController {

  static chartUser(req, res) {
    User
      .findAll({
        include: [
          { model: Clothes }
        ]
      })
      .then(data => {
        const users = data.map(el => el.name)
        const total = data.map(el => el.Clothes.length)
        res.render('dashboard/admin')
      })
      .catch(err => {
        res.send(err)
      })
    // res.render('dashboard/admin')
  }

  static showClothes(req, res) {
    Clothes.findAll()
      .then(data => {
        res.render("dashboard/clothes", { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getAddClothes(req, res) {
    res.render('dashboard/addClothes')
  }

  static postAddClothes(req, res) {
    let data = {
      name: req.body.name,
      material: req.body.material,
      color: req.body.color,
      price: req.body.price,
      stock: req.body.stock
    }
    Clothes.create(data)
      .then(() => {
        res.redirect('/admin/clothes')
      })
      .catch((err) => {
        res.send(err)
      })
  }
  static getEditClothes(req, res) {
    // 
    let id = req.params.id
    Clothes.findByPk(id)
      .then((data) => {
        res.render("dashboard/editClothes", { data })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static postEditClothes(req, res) {
    let data = {
      name: req.body.name,
      material: req.body.material,
      color: req.body.color,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image
    }
    let id = req.params.id
    Clothes.update(data, {
      where: {
        id: id
      }
    })
      .then(() => {
        res.redirect('/admin/clothes')
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static deleteClothes(req, res) {
    let id = req.params.id
    Clothes.destroy({
      where: {
        id: id
      }
    })
      .then(() => {
        res.redirect("/admin/clothes")
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static allTransaction(req, res) {
    User
      .findAll({
        where: {
          role: 'user'
        },
        include: [
          { model: Clothes }
        ]
      })
      .then(data => {
        res.render('dashboard/listUser', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }
  static listTransaction(req, res) {
    User
      .findByPk(req.params.id, {
        include: [{ model: Clothes }]
      })
      .then(data => {
        res.render('dashboard/listUserTransaction', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static acceptTransaction(req, res) {
    UserClothes
      .update({
        status: 'accept'
      }, {
        where: {
          ClothesId: req.params.idClothes,
          UserId: req.params.idUser
        }
      })
      .then(_ => {
        res.redirect('/admin/transaction')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static declineTransaction(req, res) {
    UserClothes
      .update({
        status: 'decline'
      }, {
        where: {
          ClothesId: req.params.idClothes,
          UserId: req.params.idUser
        }
      })
      .then(_ => {
        res.redirect('/admin/transaction')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = AdminController