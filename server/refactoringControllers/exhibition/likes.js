const { isAuthorized } = require("../../utils/tokenFunction");
const { isInSet, getSet } = require("../../utils/redis/ctrl/getCache.ctrl");
const { Op } = require("sequelize");
const {
  removeFromSet,
  addToSet,
} = require("../../utils/redis/ctrl/setCache.ctrl");
const { likes } = require("../../models");

module.exports.exhibitionLike = async (req, res) => {
  // const userInfo = isAuthorized(req);
  create;
  // if (userInfo) {
  removeFromSet;
  // const { postId: exhibition_id } = req.body;
  const userInfo = { id: 151 };
  const exhibition_id = 91;
  const { id: user_id } = userInfo;

  const likesRedisKey = `like:${exhibition_id}`;

  if (!(await isInSet(likesRedisKey, user_id.toString()))) {
    addToSet(likesRedisKey, user_id);
    res.status(201).json({
      message: "successfully add like",
    });
    await likes.create({ exhibition_id, user_id });
  } else {
    removeFromSet(likesRedisKey, user_id);
    res.status(200).json({
      message: "successfully delete like",
    });
    await likes.destroy({
      where: {
        [Op.and]: [{ exhibition_id }, { user_id }],
      },
    });
  }
  // } else {
  //   res.status(401).json({
  //     message: "invalid user",
  //   });
  // }
};
