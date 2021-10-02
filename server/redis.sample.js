const router = require("./controllers");
const { redisClient } = require("./utils/redis");

// router.get("/", (req, res) => {
//   const { redisKey } = req.headers;
//   return redisClient.get(redisKey, (err, data) => {
//     if (res) {
//       //캐시가 존재한다.
//       res.status(200).json({ data });
//     } else {
//       //캐시가 존재하지 않음

//       res.status(404).json({ message: "Data Not Found" });
//     }
//   });
// });

redisClient.set("haha", "23");

redisClient.get("haha", (err, data) => {
  console.log("data는 :", data);
  return data;
});
