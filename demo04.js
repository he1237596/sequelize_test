/*
 * @Author: Chris
 * @Date: 2021-04-09 15:22:19
 * @LastEditors: Chris
 * @LastEditTime: 2021-04-09 15:57:16
 * @Descripttion: 模型扩展-init（在内部,sequelize.define 调用 Model.init，所以二者本质上是等效的）
 */
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('pvmed-db', 'chris', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  port: 10001
})
class User extends Model { }
User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // 其他模型参数
  sequelize,
  modelName: 'User',
  tableName: 'Users' //直接提供表名
})

console.log(User === sequelize.models.User);