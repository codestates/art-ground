const { comments: commentsModel } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
const {
  getCached,
  caching,
  delCache,
} = require("../../utils/redis/cache.ctrl");
module.exports.deleteReview = async (req, res) => {
  const userInfo = isAuthorized(req);
  const { postId: exhibition_id, commentId: id } = req.params;
  if (userInfo) {
    const { id: user_id } = userInfo;

    const redisKey = "exhibitionReview";
    const reply = await getCached(redisKey);
    if (reply) {
      const reviewRedisKey = `${exhibition_id}Review`;
      const DetailReview = await getCached(reviewRedisKey);
      reply.some((el) => {
        if (el.id === exhibition_id) {
          el.comments.some((ele, idx) => {
            if (ele.id === id) {
              ele.splice(idx, 1);
            }
          });
        }
      });
      DetailReview.some((el, idx) => {
        if (el.id === id) {
          el.splice(idx, 1);

          return true;
        }
      });
      caching(reviewRedisKey, DetailReview);
      caching(redisKey, reply);
      res.status(200).json({
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
