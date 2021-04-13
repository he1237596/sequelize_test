/*
 * @Author: Chris
 * @Date: 2021-04-13 17:13:32
 * @LastEditors: Chris
 * @LastEditTime: 2021-04-13 18:05:47
 * @Descripttion: 模型查询（查找器）
 */
const { Sequelize, DataTypes, Op } = require("sequelize");
const config = require('./config');
const sequelize = new Sequelize(config);
const Fruits = sequelize.define('Fruits', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  num: DataTypes.INTEGER,
},{
  timestamps: true,
  createdAt: 'crateTime',
  freezeTableName: true //全局强制该表名称等于模型名称
})
console.log(Fruits);

(
  async () => {
    await Fruits.sync({force: true});
    await Fruits.bulkCreate([
      {
        name: 'apple',
        price: 5,
        num: 10,
      },
      {
        name: 'orage',
        price: 4,
        num: 20,
      },
      {
        name: 'banana',
        price: 2,
        num: 30,
      },
    ])
    // 查询所有findAll
    // await Fruits.findAll({
    //   raw: true
    // }).then((result) => {
    //   console.log(result)
    // }).catch((err) => {

    // });
    // 根据主键查询findByPk
    // await Fruits.findByPk(1).then(res=>{
    //   console.log(res)
    // })
    // 获取查询到的第一条
    // await Fruits.findOne({
    //   // price: 5,
    //   // price: {
    //   //   [Op.eq]: 5
    //   // },
    //   where: {
    //     price: {
    //       [Op.eq]: 5
    //     },
    //   },
    //   raw: true,
    // }).then(res=>{
    //   console.log(res instanceof Fruits) // raw:true此为true否则为false
    // })
    // 条件查询,有则返回无则创建，如果有defaults则覆盖条件参数内的字段值写入表内
    // 返回数组 【查询到的记录，是否是新建记录】
    // await Fruits.findOrCreate({
    //   where: {
    //     name: 'qieze',
    //   },
    //   defaults: {
    //     name: 'qiezi'
    //   },
    //   raw: true // 控制返回的对象类型
    // }).then(res=>{
    //   console.log(res)
    // res[0]:{name: 'qiezi'} res[1]:false
    // })
    // 返回{count: 3, rows: [{},{}]}
    /*
    {
      count: 3,
      rows: [
        {
          id: 2,
          name: 'orage',
          price: 4,
          num: 20,
          crateTime: 2021-04-13T10:02:08.514Z,
          updatedAt: 2021-04-13T10:02:08.514Z
        },
        {
          id: 3,
          name: 'banana',
          price: 2,
          num: 30,
          crateTime: 2021-04-13T10:02:08.514Z,
          updatedAt: 2021-04-13T10:02:08.514Z
        }
      ]
    }
    */
    await Fruits.findAndCountAll({
      where: {
        name: {
          [Op.regexp]: 'a'
        }
      },
      // 返回数量（分页）
      limit: 2,
      // 跳过多少条
      offset: 1,
      raw: true
    }).then(res=>{
      console.log(res)
    })
  }
)();

// const init =
// async () => {
//   await Fruits.sync();
//   await Fruits.bulkCreate([
//     {
//       name: 'apple',
//       price: 5,
//       num: 10,
//     },
//     {
//       name: 'orage',
//       price: 4,
//       num: 20,
//     },
//     {
//       name: 'banana',
//       price: 2,
//       num: 30,
//     },
//   ])
//   await Fruits.findAll({
//     raw: true
//   }).then((result) => {
//     console.log(result)
//   }).catch((err) => {

//   });
// }
// init();

