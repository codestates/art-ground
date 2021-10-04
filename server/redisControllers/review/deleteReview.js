const { comments: commentsModel } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
const {
  getCached,
  caching,
  delCache,
} = require("../../utils/redis/cache.ctrl");
module.exports.deleteReview = async (req, res) => {
  const userInfo = isAuthorized(req);

  const { postId, commentId } = req.params;
  if (userInfo) {
    const { id: user_id } = userInfo;
    const exhibition_id = parseInt(postId);
    const id = parseInt(commentId);
    const redisKey = "exhibitionReview";
    const reply = await getCached(redisKey);

    if (reply) {
      const reviewRedisKey = `${exhibition_id}Review`;
      const DetailReview = await getCached(reviewRedisKey);

      reply.some((el) => {
        if (el.id === exhibition_id) {
          el.comments.some((ele, idx) => {
            if (ele.id === id) {
              el.comments.splice(idx, 1);
            }
          });
        }
      });
      DetailReview.commentsData.some((el, idx) => {
        if (el.id === id) {
          DetailReview.commentsData.splice(idx, 1);

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
    }
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
