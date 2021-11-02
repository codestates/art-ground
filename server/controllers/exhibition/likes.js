const { isAuthorized } = require("../../utils/tokenFunction");
const { likes, sequelize } = require("../../models");
const {
  getCached,
  caching,

  cacheIncr,
} = require("../../utils/redis/cache.ctrl");
module.exports.exhibitionLike = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { postId: exhibition_id, type: exhibit_type } = req.body;
    const { id: user_id } = userInfo;
    const redisKey =
      exhibit_type === undefined
        ? "allExhibition"
        : exhibit_type === 1
        ? "standard"
        : "premium";
    //exhibit_type 도 추가로 받아야 한다.
    //getCache
    //캐싱 데이터에서
    //data[n].likes.push({data})
    //setCache
    const likesRedisKey = `${exhibition_id}likes`;
    let lastLikesId;
    if (await getCached("lastLikesId")) {
      lastLikesId = await cacheIncr("lastLikesId");
    } else {
      const { id } = await likes.findOne({
        raw: true,
        attributes: ["id"],
        order: [[sequelize.literal("createdAt"), "desc"]],
      });
      caching("lastLikesId", id);
      lastLikesId = await cacheIncr("lastLikesId");
    }
    const reply = await getCached(redisKey);
    const likesReply = await getCached(likesRedisKey);

    if (likesReply) {
      likesReply.push({ id: lastLikesId, user_id });
      caching(likesRedisKey, likesReply);
    } else {
      const result = await likes.findAll({
        raw: true,
        attributes: ["id", "user_id"],
        where: {
          exhibition_id,
        },
      });
      result.push({ id: lastLikesId, user_id });
      caching(likesRedisKey, result);
    }
    if (reply) {
      reply.some((el) => {
        if (el.id === exhibition_id) {
          el.likes.push({ exhibition_id, user_id });
          return true;
        }
      });

      caching(redisKey, reply);
      res.status(201).json({
        message: "successfully add like",
      });
      await likes.create({ exhibition_id, user_id });
    }
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
