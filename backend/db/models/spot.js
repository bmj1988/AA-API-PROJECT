'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'})

      Spot.hasMany(models.Review, {foreignKey: 'spotId'})

      Spot.hasMany(models.Image, {foreignKey: 'imageableId'})
    }
  }
  Spot.init({
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        addressChecker(value) {
          splitAddy = value.split(' ')
          if (!Validator.isNumeric(splitAddy[0]) || !Validator.isAlpha(splitAddy[1])) {
            throw new Error('Must provide valid address!')
          }
        }
      }},
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }},
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }},
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }},
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      }},
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      }},
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: [this.address, this.city, this.state].join(', '),
      validate: {
        isAlphanumeric: true,
      }},
    price: {
      type: DataTypes.DECIMAL,
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
