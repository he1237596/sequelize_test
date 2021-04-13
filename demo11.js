/*
 * @Author: Chris
 * @Date: 2021-04-09 15:22:19
 * @LastEditors: Chris
 * @LastEditTime: 2021-04-13 16:37:24
 * @Descripttion: 批量创建 bulkCreate: validate必须显示生命
 */
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = new Sequelize('pvmed-db', 'chris', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  port: 10001
})

const Teacher = sequelize.define('Teacher',{
  firstName: {
    type: DataTypes.STRING,
    // allowNull: false
  },
  midName: DataTypes.STRING, // 字段只有类型属性时可简写
  age: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate
    validate: {
      len: [4,6]
    },
    defaultValue: '1100' // 设置默认值，默认为null
  },
}, {
  timestamps: true,
  updatedAt: false,
  createdAt: 'createTime',
})
// User.sync({
//   force: true
// });
const init = async () => {
  // 同步模型到数据库=>创建表
  await sequelize.sync({
    force: true,
  })
  // await sequelize.sync() //同步所有模型
  console.log("用户模型表刚刚(重新)创建！")
  // User插入一条记录
  const jane = await Teacher.bulkCreate([
    {
      firstName: 'lao',
      age: 18,
      lastName: 'wang',
    },
    {
      firstName: 'xiao',
      age: 18,
      lastName: 'heihei',
    },
    {
      firstName: 'xiao',
      age: 10,
      lastName: 'heihei',
    }
  ],{
    // validate 此处是关键
    validate: true,
    // 只fields字段有效
    // fields: ['firstName']
  })

  await Teacher.findAll({
    // where: {
    //   age: {
    //     [Op.or]: [14, 18]
    //   }
    // },
    // order: [['age', 'DESC']],
    order: [
      [sequelize.fn('max', sequelize.col('age')),'DESC']
    ],
    // group: 'firstName',
    raw: true
  }).then(rows => {
    // raw: true返回查询的表数据,默认为false返回查询实例
    console.log("查询完毕",rows)
    sequelize.close()
  });

}
init();