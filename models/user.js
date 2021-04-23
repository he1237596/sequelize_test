'use strict';
const {
  Model, DataTypes, Sequelize
} = require('sequelize');
class BaseModel extends Model {
  static init(attributes, options={}){
    const _attributes = {};
    Object.assign(_attributes, attributes, {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
        comment: '主键ID',
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: '删除用户'
      }
    })
    super.init(attributes, options);
  }
}
module.exports = (sequelize, DataTypes) => {
  class User extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: DataTypes.STRING,
    sex: DataTypes.STRING
  }, {
    sequelize,
    // modelName: 'User',
    // tableName: 'user'
  });
  return User;
};