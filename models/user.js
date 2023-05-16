'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  User.init({
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    isActive: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    geoLocation: DataTypes.STRING,
    socketId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};