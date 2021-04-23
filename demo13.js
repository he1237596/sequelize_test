/*
 * @Author: Chris
 * @Date: 2021-04-19 10:40:45
 * @LastEditors: Chris
 * @LastEditTime: 2021-04-21 14:02:58
 * @Descripttion: **
 */
const Koa = require('koa');
const app = new Koa();


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  host: 'localhost',
  port: 10001,
  dialect: 'postgres',
  database: 'chris_test',
  username: 'chris',
  password: 123456,
})

const Teachers = sequelize.define('teacher',{
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
})

const Students = sequelize.define('student',{
  name: DataTypes.STRING,
  age: DataTypes.SMALLINT,
},{
  underscored: true // 下划线
});
// Fruits.belongsTo(Carts, {targetKey: 'id', foreignKey: 'product_id'});
Students.belongsTo(Teachers);
Teachers.hasOne(Students);
// Carts.hasOne(Fruits);
console.log(Teachers.prototype);
console.log(Students.prototype);
// (
//   async () => {
//     await sequelize.sync({force: true});
//     await sequelize.authenticate().then(res=>{
//       console.log('创建成功');
//     });

//     const teacher = await Teachers.create({
//       name: 'Mrs Wang',
//       price: 10,
//       num: 1,
//       // student: {
//       //   name: 'xiaoming',
//       //   price: 10,
//       //   num: 1,
//       // }
//     })
//     await Students.create({
//       name: 'xiaoming',
//       price: 10,
//       num: 1,
//       teacherId: 1,
//       // teacher: {
//       //   name: 'xiaoming',
//       //   price: 10,
//       //   num: 1,
//       // }
//     })
//     // console.log(teacher)
//     // console.log(teacher.dataValues.id)

//     await Students.findAll({
//       include: [Teachers],
//       raw: true
//     }).then(res=>{
//       console.log(res[0])
//     })
//     await Teachers.findAll({
//       include: [Students]
//     }).then(res=>{
//       console.log(res.dataValues)
//     })
//   }
// )();

app.use(async ctx => {
  await sequelize.sync({force: true});
  await sequelize.authenticate().then(res=>{
    console.log('创建成功');
  });

  const teacher = await Teachers.create({
    name: 'Mrs Wang',
    price: 10,
    num: 1,
    // student: {
    //   name: 'xiaoming',
    //   price: 10,
    //   num: 1,
    // }
  })
  await Students.create({
    name: 'xiaoming',
    price: 10,
    num: 1,
    teacherId: 1,
    // teacher: {
    //   name: 'xiaoming',
    //   price: 10,
    //   num: 1,
    // }
  })
  // console.log(teacher)
  // console.log(teacher.dataValues.id)

  // await Students.findAll({
  //   include: [Teachers],
  //   raw: true
  // }).then(res=>{
  //   console.log(res[0])
  //   ctx.body = res;
  // })
  await Teachers.findAll({
    include: [Students]
  }).then(res=>{
    // console.log(res.dataValues)
    ctx.body = res;
  })

});

app.listen(3000);