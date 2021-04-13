/*
 * @Author: Chris
 * @Date: 2021-04-08 18:26:11
 * @LastEditors: Chris
 * @LastEditTime: 2021-04-09 13:22:55
 * @Descripttion: **
 */
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://pvmed-root:S3p5OKplVRkOcmQC@localhost:16001/pvmed-db')
// const sequelize = new Sequelize('postgres://user:pass@example.com:16001/dbname')
// database: setDefault('DB_NAME', 'pvmed-db'),
// username: setDefault('DB_USER_NAME', 'pvmed-root'),
// password: setDefault('DB_PWD', 'S3p5OKplVRkOcmQC'),
// host: setDefault('DB_HOST', 'localhost'),
// dbPort: setDefault('DB_PORT', 16001),
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });