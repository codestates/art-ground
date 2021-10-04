const { isAuthorized } = require("../../utils/tokenFunction");
const { likes } = require("../../models");
const {
  getCached,
  caching,
  delCache,
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

    const reply = await getCached(redisKey);

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
