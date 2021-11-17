const { redisClient } = require("./utils/redis");
const { images, exhibition } = require("./models");
const { getHash, getList } = require("./utils/redis/ctrl/getCache.ctrl");
const { cacheInitialization } = require("./utils/redis/cacheInitialization");
const { filter, mapObject, isEqual } = require("underscore");
const { findAll, findOne } = require("./utils/dbFunction");
const { setHash } = require("./utils/redis/ctrl/setCache.ctrl");

const test = async (...arg) => {
  console.log(isEqual("1", "1"));
  // const arr = [];
  // arr.push(await getHash("comment:61"));
  // console.log(arr);
  // const a = await findAll(exhibition, { raw: true });
  // console.log(a[0]);
  //   await redisClient.hgetall("exhibition:64", (err, data) => {
  //     console.log(data);
  //   })
  // );
  //cacheInitialization();
  // const images = await getListCache("images:91", 0, -1);
  // const likes = await getSetCache("likes:91");
  // const mappingData = map(result, (el) => {
  //   console.log(el);
  //   //  return go(el, addAttr(el, "images", images), addAttr(el, "likes", likes));
  // });
  // console.log(mappingData);
  // console.log(Cache);
  // console.log(reply);
  // return new Promise((resolve, reject) => {
  //   redisClient.lrange("a", 0, -1, (err, data) => {
  //     resolve(data);
  //   });
  // });
};

// const test2 = async () => {
//   const result = await test();
//   console.log(result);
// };
//test();

// console.log(
//   map({ a: "hello" }, (el) => {
//     return el.toUpperCase();
//   })
// );

// const users = [
//   { age: 18, name: "DO" },
//   { age: 19, name: "DU" },
//   { age: 20, name: "DP" },
//   { age: 21, name: "DA" },
// ];
// const a = pluck(users, "name");
// console.log(a);

test();
// function _pipe() {
//   let fncs = arguments;
//   return function (arg) {
//     return _reduce(
//       fns,
//       function (arg, fn) {
//         return fn(arg);
//       },
//       arg
//     );
//   };
// }
