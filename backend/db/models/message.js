'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, {foreignKey: 'fromId', as: 'sender'})

      Message.belongsTo(models.User, {foreignKey: 'toId', as: 'recipient'})
    }
  }
  Message.init({
    fromId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    toId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      }},
    replyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
