const { comments: commentsModel } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
const {
  getCached,
  caching,
  delCache,
} = require("../../utils/redis/cache.ctrl");
module.exports.deleteReview = async (req, res) => {
  const userInfo = isAuthorized(req);
  const { postId: exhibition_id, commentsId: id } = req.params;
  if (userInfo) {
    const { id: user_id } = userInfo;

    const redisKey = "exhibitionReview";
    const reply = await getCached(redisKey);
    if (reply) {
      const reviewRedisKey = `${exhibition_id}Review`;
      const DetailReview = await getCached(reviewRedisKey);

      DetailReview.some((el, idx) => {
        if (el.id === id) {
          el.splice(idx, 1);

          return true;
        }
      });
      caching(reviewRedisKey, DetailReview);
      caching(redisKey, reply);
      res.status(201).json({
        message: "successfully delete comments",
      });
      await commentsModel.destroy({
        where: {
          id,
          user_id,
        },
      });

      res.status(201).json({
        message: "successfully delete comments",
      });
    }
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
