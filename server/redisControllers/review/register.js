const { comments: commentsModel } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
const {
  getCached,
  caching,
  delCache,
  cacheIncr,
} = require("../../utils/redis/cache.ctrl");
module.exports.postReview = async (req, res) => {
  const userInfo = isAuthorized(req);

  const { postId: exhibition_id, comments } = req.body;

  if (userInfo) {
    const redisKey = "exhibitionReview";
    const { id: user_id, nickname, profile_img } = userInfo;
    const reply = await getCached(redisKey);
    const lastCommentId = await cacheIncr("lastCommentId");

    /**
     * reply[n].comments.push({user_id,exhibition_id,comments})
     */

    if (reply) {
      const reviewRedisKey = `${exhibition_id}Review`;

      const DetailReview = await getCached(reviewRedisKey);

      DetailReview.commentsData.push({
        id: lastCommentId,
        user_id,
        exhibition_id,
        comments,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: user_id,
          nickname,
          profile_img,
        },
      });
      reply.some((el) => {
        if (el.id === exhibition_id) {
          el.comments.push({
            id: lastCommentId,
            user_id,
            exhibition_id,
            comments,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          return true;
        }
      });
      caching(reviewRedisKey, DetailReview);
      caching(redisKey, reply);

      res.status(201).json({
        message: "successfully add comments",
      });

      await commentsModel.create({
        user_id,
        exhibition_id,
        comments,
      });
    }
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
