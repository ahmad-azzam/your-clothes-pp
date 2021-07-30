'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/password');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Clothes, { through: "UserClothes" })
    }
    countTransaction(data) {
      let count = 0
      data.forEach(el => {
        if (el.UserClothes.status === 'Dalam Konfirmasi') {
          count++
        }
      })
      return count
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name Must be Required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email Must be Required'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Phone Must be Required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password Must be Required'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPassword(instance.password)
        instance.role = 'user'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};