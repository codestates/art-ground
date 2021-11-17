const { isAuthorized } = require("../../utils/tokenFunction");
const { likes, sequelize } = require("../../models");
const {
  getStringCached,
  removeFromSet,
  addToSet,
  isInSet,
  initialize,
} = require("../../utils/redis/ctrl/getCache.ctrl");
module.exports.exhibitionLike = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { postId: exhibition_id } = req.body;
    const { id: user_id } = userInfo;

    const likesRedisKey = `likes:${exhibition_id}`;
    const isGetDataFromDb = await getStringCached("IS_GET_DB");

    if (isGetDataFromDb) {
      if (await isInSet(likesRedisKey, user_id)) {
        removeFromSet(likesRedisKey, user_id);
        res.status(201).json({
          message: "successfully add like",
        });
      } else {
        addToSet(likesRedisKey, user_id);
        res.status(200).json({
          message: "successfully delete like",
        });
      }
    } else {
      initialize();
    }
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
