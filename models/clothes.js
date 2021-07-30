'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clothes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clothes.belongsToMany(models.User, { through: "UserClothes", foreignKey: 'ClothesId' })
    }
    generatePrice() {
      return `Rp ${this.price.toLocaleString('id-ID')},-`
    }
  };
  Clothes.init({
    name: DataTypes.STRING,
    material: DataTypes.STRING,
    color: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clothes',
  });
  return Clothes;
};