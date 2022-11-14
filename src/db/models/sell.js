'use strict';
const {
  Model
} = require('sequelize');
const stock = require('./stock');
module.exports = (sequelize, DataTypes) => {
  class sell extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sell.belongsTo(models.stock, {
        foreignKey: "stock_id",
        as: "stocks"
      })
    }
  }
  sell.init({
    stock_id: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    cash: DataTypes.INTEGER,
    change: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sell',
    underscored: true,
  });
  return sell;
};