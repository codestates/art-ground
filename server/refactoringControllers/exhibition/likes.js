const { isAuthorized } = require("../../utils/tokenFunction");
const { isInSet } = require("../../utils/redis/ctrl/getCache.ctrl");
const { Op } = require("sequelize");
const { likes } = require("../../models");
const { addLikes, withdrawalLike } = require("../../utils/customFunction");

module.exports.exhibitionLike = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { postId: exhibition_id } = req.body;
    const { id: user_id } = userInfo;

    if (!(await isInSet(`like:${exhibition_id}`, user_id.toString()))) {
      await addLikes(exhibition_id, user_id);
      res.status(201).json({
        message: "successfully add like",
      });
      await likes.create({ exhibition_id, user_id });
    } else {
      await withdrawalLike(exhibition_id, user_id);
      res.status(200).json({
        message: "successfully delete like",
      });
      await likes.destroy({
        where: {
          [Op.and]: [{ exhibition_id }, { user_id }],
        },
      });
    }
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
