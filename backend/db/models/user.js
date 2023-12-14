'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Spot, {foreignKey: 'ownerId', onDelete: 'CASCADE'})

      User.hasMany(models.Booking, {foreignKey: 'userId', onDelete: 'CASCADE'})

      User.hasMany(models.Review, {foreignKey: 'userId', onDelete: 'CASCADE'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {args: [4, 30], msg: 'Username must be between 4 and 30 characters'},
        isNotEmail(value) {
          if (Validator.isEmail(value) === true) {
            throw new Error('Cannot have email for username!')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {args: true, msg: 'This email address belongs to another account'},
      validate: {
        len: {args: [3, 256], msg: 'Email length must be between 3 and 256 characters'},
        isEmail: {args: true, msg: 'Must provide a valid email!'}
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: 'First name must not be null'},
      validate: {
        isAlpha: {args: true, msg: 'Must provide a real first name'},
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: 'Last name must not be null'},
      validate: {
        isAlpha: {args: true, msg: 'Must provide a real last name'},
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
