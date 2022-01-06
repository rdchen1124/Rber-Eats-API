'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meal.belongsTo(models.Store);
    }
  };
  Meal.init({
    name: DataTypes.STRING,
    img: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    StoreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Meal',
  });
  return Meal;
};