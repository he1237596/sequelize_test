/*
 * @Author: Chris
 * @Date: 2021-04-09 15:22:19
 * @LastEditors: Chris
 * @LastEditTime: 2021-04-12 18:22:19
 * @Descripttion: 更新特定字段
 */
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('pvmed-db', 'chris', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  port: 10001
})
class User extends Model {
  // 模型作为实例，添加自定义方法
  // static classLevelMethod() {
  //   return 'foo';
  // }
  // instanceLevelMethod() {
  //   return 'bar';
  // }
  // getFullname() {
  //   return [this.firstname, this.lastname].join(' ');
  // }
}
User.init({
  firstName: {
    type: DataTypes.STRING,
    // allowNull: false
  },
  midName: DataTypes.STRING, // 字段只有类型属性时可简写
  age: DataTypes.INTEGER,
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '110' // 设置默认值，默认为null
  },
}, {
  // 其他模型参数
  sequelize,
  // timestamps: false, // 默认为true，自动插入createdAt/updatedAt字段
  /* 只插入创建时间，且重命名为createTime字段 */
  timestamps: true,
  updatedAt: false,
  createdAt: 'createTime',

  modelName: 'User1', //可修改model的名字，若修改则sequelize.models.User为undefined
  tableName: 'Users' //直接提供表名
})
// User.sync({
//   force: true
// });
const init = async () => {
  // 同步模型到数据库=>创建表
  await User.sync({
    force: true,
  })
  // await sequelize.sync() //同步所有模型
  console.log("用户模型表刚刚(重新)创建！")
  // User插入一条记录
  const jane = await User.create({
    firstName: 'test',
    lastName: '03',
  })
  jane.firstName = 'my';
  jane.lastName = '001'
  await jane.save({fields: ['lastName']});
  // await jane.reload();
  // .then(res => {
  //   // res返回创建对象的实例
  //   // console.log(res.dataValues) // 新创建的数据
  //   console.log('插入成功:',res)

  // }, err => {
  //   console.log(err);
  // });
  // 查询User表所有记录
  await User.findAll({
    raw: true
  }).then(rows => {
    // raw: true返回查询的表数据,默认为false返回查询实例
    console.log("查询完毕",rows)
  }, err => {
    console.log(err);
  });
  // 删除与User模型相关的User表
  // await User.drop();

  // await sequelize.drop(); // 删除所有表

}
init();