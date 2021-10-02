const { isAuthorized } = require("../../utils/tokenFunction");
const { likes } = require("../../models");
const {
  getCached,
  caching,
  delCache,
} = require("../../utils/redis/cache.ctrl");
module.exports.exhibitionLike = async (req, res) => {
  //const userInfo = isAuthorized(req);

  const userInfo = { id: 45 };
  if (userInfo) {
    const { postId: exhibition_id, type: exhibit_type } = req.body;
    const { id: user_id } = userInfo;
    const redisKey =
      exhibit_type === undefined
        ? "allExhibition"
        : exhibit_type === "1"
        ? "standard"
        : "premium";
    //exhibit_type 도 추가로 받아야 한다.
    //getCache
    //캐싱 데이터에서 id = exhibition_id 인 데이터 찾아서
    //data[n].likes.push({data})
    //setCache
    const reply = await getCached(redisKey);

    if (reply) {
      const data = reply.map((el) => {
        return el.id === exhibition_id
          ? el.likes.push({ exhibition_id, user_id })
          : true;
      });

      caching(redisKey, data);
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
