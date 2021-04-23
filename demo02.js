/*
 * @Author: Chris
 * @Date: 2021-04-09 14:22:35
 * @LastEditors: Chris
 * @LastEditTime: 2021-04-19 11:28:43
 * @Descripttion: 再当前项目使用docker-compose.yml配置创建docker数据库服务，链接数据库测试
 * sudo docker-compose up -d 自定构建镜像创建服务启动
 */
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  port: 10001,
  dialect: 'postgres',
  database: 'pvmed-db',
  username: 'chris',
  password: 123456
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });