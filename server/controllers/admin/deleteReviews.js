const { comments, exhibition, images, users } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
const { getCached, caching } = require("../../utils/redis/cache.ctrl");
module.exports = {
  deleteReviews: async (req, res) => {
    const userInfo = isAuthorized(req);

    const { postId, commentId } = req.params;
    const exhibition_id = parseInt(postId);
    const id = parseInt(commentId);
    //전시 리뷰에서 리뷰삭제.
    //디테일 리뷰에서 리뷰삭제..
    if (userInfo.user_type === 3) {
      const redisKey = "exhibitionReview";
      const reviewRedisKey = `${exhibition_id}Review`;
      let reply;
      let DetailReview;
      if (await getCached(redisKey)) {
        reply = await getCached(redisKey);
      } else {
        const result = await exhibition.findAll({
          include: [
            {
              model: images,
              as: "images",
            },
            {
              attributes: ["nickname", "profile_img", "author_desc"],
              model: users,
              as: "author",
            },
            {
              model: comments,
              as: "comments",
            },
          ],
          where: {
            status: [1, 2],
          },
        });
        const data = result.map((el) => el.dataValues);
        reply = data;
      }

      if (await getCached(reviewRedisKey)) {
        DetailReview = await getCached(reviewRedisKey);
      } else {
        const commentsResult = await comments.findAll({
          include: [
            {
              attributes: ["id", "nickname", "profile_img"],
              model: users,
              as: "user",
            },
          ],
          where: {
            exhibition_id,
          },
        });

        const exhibitResult = await exhibition.findOne({
          include: [
            {
              attributes: ["nickname"],
              model: users,
              as: "author",
            },
          ],
          attributes: [
            "id",
            "title",
            "start_date",
            "end_date",
            "genre_hashtags",
            "status",
            "exhibit_type",
          ],

          where: {
            id: exhibition_id,
          },
        });

        // select * from images where exhibition_id =47  order by id asc \G;
        const imagesResult = await images.findAll({
          limit: 1,
          attributes: ["image_urls"],
          where: {
            exhibition_id,
          },
          order: [["id", "ASC"]],
        });

        const commentsData = commentsResult.map((el) => el.dataValues);
        const exhibitionData = exhibitResult.dataValues;

        const thumbnail = imagesResult.map((el) => el.dataValues);

        caching(reviewRedisKey, { commentsData, exhibitionData, thumbnail });

        DetailReview = await getCached(reviewRedisKey);
      }

      reply.some((el) => {
        if (el.id === exhibition_id) {
          el.comments.some((ele, idx) => {
            if (ele.id === id) {
              el.comments.splice(idx, 1);
              return true;
            }
          });
          return true;
        }
      });
      DetailReview.commentsData.some((el, idx) => {
        if (el.id === id) {
          DetailReview.commentsData.splice(idx, 1);

          return true;
        }
      });
      caching(redisKey, reply);
      caching(reviewRedisKey, DetailReview);
      res.status(200).json({
        message: "successfully delete comments",
      });

      await comments.destroy({
        where: {
          id,
        },
      });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
//
