// const SequelizeAuto = require("sequelize-auto");
// const auto = new SequelizeAuto("art_ground", "admin", "root1234", {
//   host: "my-database-practice.ctobugrb9z8w.ap-northeast-2.rds.amazonaws.com",
//   dialect: "mysql",
//   directory: "models",
//   port: "13306",
//   additional: {
//     timestamps: true,
//   },
// });

// auto.run((err) => {
//   if (err) {
//     console.log("에러 ㅠㅠ");
//   }

//   console.log(auto.tables);
//   console.log(auto.foreignKeys);
// });

// const testExId = 33;
// const testUId = 39;
// const a = [
//   {
//     id: 33,
//     likes: [
//       { exhibition_id: 33, user_id: 30 },
//       { exhibition_id: 33, user_id: 39 },
//       { exhibition_id: 33, user_id: 44 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//     ],
//   },
//   {
//     id: 36,
//     likes: [
//       { exhibition_id: 33, user_id: 30 },
//       { exhibition_id: 33, user_id: 39 },
//       { exhibition_id: 33, user_id: 44 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//     ],
//   },
//   {
//     id: 99,
//     likes: [
//       { exhibition_id: 33, user_id: 30 },
//       { exhibition_id: 33, user_id: 39 },
//       { exhibition_id: 33, user_id: 44 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//     ],
//   },
//   {
//     id: 100,
//     likes: [
//       { exhibition_id: 33, user_id: 30 },
//       { exhibition_id: 33, user_id: 39 },
//       { exhibition_id: 33, user_id: 44 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//       { exhibition_id: 33, user_id: 40 },
//     ],
//   },
// ];
// a.some((el) => {
//   console.log("ha");
//   if (el.id === testExId) {
//     el.likes.some((ele, idx) => {
//       if (ele.user_id === testUId) {
//         el.likes.splice(idx, 1);
//       }

//       return true;
//     });

//     return true;
//   }
// });

// console.log(a[0]);

// const b = [1, 2, 3, 4];

// b.some((el) => {
//   console.log(el);
//   return el === 2;
// });
const eve = new Date();
console.log(eve);
