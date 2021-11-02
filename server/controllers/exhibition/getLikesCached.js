const { getCached } = require("../../utils/redis/cache.ctrl");

//request header 로 postId만 받아온다.
module.exports.getLikesCached = async (req, res) => {
  const { postId: id } = req.params;
  const likesRedisKey = `${id}likes`;
  const reply = await getCached(likesRedisKey);
  if (reply) {
    const likes = reply;
    res.status(200).json(likes);
  }
};
