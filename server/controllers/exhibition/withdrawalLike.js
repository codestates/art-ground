const { likes } = require("../../models");
const { Op } = require("sequelize");
const { isAuthorized } = require("../../utils/tokenFunction");
const { getCached, caching } = require("../../utils/redis/cache.ctrl");
module.exports.withdrawalLike = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { postId, type: exhibit_type } = req.params;
    const exhibition_id = parseInt(postId);
    const { id: user_id } = userInfo;

    const redisKey =
      exhibit_type === undefined
        ? "allExhibition"
        : exhibit_type === "1"
        ? "standard"
        : "premium";
    const likesRedisKey = `${exhibition_id}likes`;

    const reply = await getCached(redisKey);
    const likesReply = await getCached(likesRedisKey);

    if (reply) {
      reply.some((el) => {
        if (el.id === exhibition_id) {
          el.likes.some((ele, idx) => {
            if (ele.user_id === user_id) {
              el.likes.splice(idx, 1);
              return true;
            }
          });
          return true;
        }
      });
      if (likesReply) {
        likesReply.some((el, idx) => {
          if (el.user_id === user_id) {
            likesReply.splice(idx, 1);
            return true;
          }
        });
        caching(likesRedisKey, likesReply);
      } else {
        const result = await likes.findAll({
          raw: true,
          attributes: ["id", "user_id"],
          where: {
            exhibition_id,
          },
        });

        result.some((el, idx) => {
          if (el.user_id === user_id) {
            result.splice(idx, 1);
            return true;
          }
        });
        caching(likesRedisKey, result);
      }
    }

    caching(redisKey, reply);

    res.status(200).json({
      message: "successfully delete like",
    });
    await likes.destroy({
      where: {
        [Op.and]: [{ exhibition_id }, { user_id }],
      },
    });
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
