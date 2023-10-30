'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE'})

      Booking.belongsTo(models.Spot, {foreignKey: 'spotId', onDelete: 'CASCADE'})
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        StartAfterNow(value) {
          if (new Date(value) < (new Date())) {
            throw new Error('startDate cannot be in the past')
          }
        },
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        StartBeforeEnd() {
          if (this.startDate >= this.endDate) {
            throw new Error('endDate cannot be on or before startDate')
          }
        }
      }}
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
