/*
 * @Author: Chris
 * @Date: 2021-04-09 15:22:19
 * @LastEditors: Chris
 * @LastEditTime: 2021-04-09 19:16:51
 * @Descripttion: 模型定义-define
 * DataTypes：数据类型
 */
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('pvmed-db', 'chris', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  port: 10001,
  // define: {
  //   // 其他模型参数
  //   // freezeTableName: true //全局强制该表名称等于模型名称
  // }
})
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull: true, //默认即为true
  }
}, {
  // 其他模型参数
  // freezeTableName: true //强制该表名称等于模型名称
  tableName: 'Users' //直接提供表名
})
console.log(User === sequelize.models.User)
