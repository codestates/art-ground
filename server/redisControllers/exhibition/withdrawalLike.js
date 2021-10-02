const { likes } = require("../../models");
const { Op } = require("sequelize");
const { isAuthorized } = require("../../utils/tokenFunction");
const {
  getCached,
  caching,
  delCache,
} = require("../../utils/redis/cache.ctrl");
module.exports.withdrawalLike = async (req, res) => {
  //const userInfo = isAuthorized(req);
  const userInfo = { id: 45 };
  if (userInfo) {
    const { postId: exhibition_id, type: exhibit_type } = req.params;
    const { id: user_id } = userInfo;
    const redisKey =
      exhibit_type === undefined
        ? "allExhibition"
        : exhibit_type === "1"
        ? "standard"
        : "premium";
    const reply = await getCached(redisKey);

    if (reply) {
      reply.some((el) => {
        if (el.id === exhibition_id) {
          el.likes.some((ele, idx) => {
            if (ele.user_id === user_id) {
              el.likes.splice(idx, 1);
            }
            return false;
          });

          return false;
        }
      });

      caching(redisKey, reply);
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
