/*
 * @Author: Chris
 * @Date: 2021-04-09 15:22:19
 * @LastEditors: Chris
 * @LastEditTime: 2021-04-13 15:53:16
 * @Descripttion: 更新记录update 删除记录destory
 */
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = new Sequelize('pvmed-db', 'chris', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  port: 10001
})

const Student = sequelize.define('Student',{
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
    defaultValue: '110' // 设置默认值，默认为null
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
  await Student.sync({
    force: true
  })
  console.log("用户模型表刚刚(重新)创建！")
  // User插入一条记录
  const xiaoming = await Student.create({
    firstName: 'xiao',
    lastName: 'ming',
  })
  await Student.create({
    firstName: 'lao',
    age: 18,
    lastName: 'wang',
  })
  await Student.update({
    lastName: 'hei'
  },{
    where: {
      lastName: 'ming',
    }
  })

  await Student.destroy({
    where: {
      firstName: "xiao"
    }
  });
  // await Student.destroy({
  //   truncate: true
  // });

  await Student.findAll({
    raw: true
  }).then(rows => {
    // raw: true返回查询的表数据,默认为false返回查询实例
    console.log("查询完毕",rows)
    sequelize.close()
  });
}
init();