/*
 * @Author: Chris
 * @Date: 2021-04-09 13:31:01
 * @LastEditors: Chris
 * @LastEditTime: 2021-04-12 17:04:29
 * @Descripttion: Sequelize链接docker已有数据库
 */
// const sequelize = new Sequelize('postgres://user:pass@example.com:16001/dbname')
// database: setDefault('DB_NAME', 'pvmed-db'),
// username: setDefault('DB_USER_NAME', 'pvmed-root'),
// password: setDefault('DB_PWD', 'S3p5OKplVRkOcmQC'),
// host: setDefault('DB_HOST', 'localhost'),
// dbPort: setDefault('DB_PORT', 16001),

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://pvmed-root:S3p5OKplVRkOcmQC@localhost:16001/pvmed-db');

// const sequelize = new Sequelize('pvmed-db', 'pvmed-root', 'S3p5OKplVRkOcmQC', {
//   dialect: 'postgres',
//   host: 'localhost',
//   port: 16001,
//   pool: {   //连接池设置
//     max: 5, //最大连接数
//     min: 0, //最小连接数
//     idle: 10000
//   },
// })

// const test = async () => {
//   await sequelize.authenticate()
//     .then(() => {
//       console.log('Connection has been established successfully');
//     })
//     .catch(err => {
//       console.log('Unable to connect to the database:', err);
//     });
// }
// test();
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });

