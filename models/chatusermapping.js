'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chatusermapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Chat, { through: chatusermapping, foreignKey: 'roomId', targetKey: 'id', onDelete: 'CASCADE' });
      models.Chat.belongsToMany(models.User, { through: chatusermapping, foreignKey: 'userId', targetKey: 'id', onDelete: 'CASCADE' });
    }
  }
  chatusermapping.init({
    roomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chatusermapping',
  });
  return chatusermapping;
};