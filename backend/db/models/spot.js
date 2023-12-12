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
      Spot.belongsTo(models.User, {foreignKey: 'ownerId', as: 'Owner'})

      Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'CASCADE'})

      Spot.hasMany(models.Image, {foreignKey: 'imageableId', as: 'SpotImages', onDelete: 'CASCADE'})

      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE'})
    }
  }
  Spot.init({
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        addressChecker(value) {
          let splitAddy = value.split(' ')
          if (!Validator.isNumeric(splitAddy[0]) || !Validator.isAlpha(splitAddy[1])) {
            throw new Error('Must provide valid address!')
          }
        }
      }},
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: 'Description is required'}
      }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: 'City is required'}
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: 'State is required'}
      }
      },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: 'Country is required'}
      }
      },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: {args: -90, msg: 'Latitude must be within -90 and 90'},
        max: {args: 90, msg: 'Latitude must be within -90 and 90'},
      }},
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: {args: -180, msg: 'Longitude must be within -180 and 180'},
        max: {args: 180, msg: 'Longitude must be within -180 and 180'},
      }},
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: [this.address, this.city, this.state].join(', '),
      validate: {
          notEmpty: {args: true, msg: 'Name is required'},
          lessThanFiftyChars(value) {
            if (value.length > 50) {
              throw new Error('Name must be less than 50 characters')
            }
          }
      }
      },
    price: {
      type: DataTypes.DECIMAL,
      validate: {
        min : 0.00
      }
    },
    previewImage: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        isUrl: {args: true, msg: 'Preview Image must have a valid URL'}
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
