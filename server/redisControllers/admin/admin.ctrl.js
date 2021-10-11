const { exhibition, comments, users, images, likes } = require("../../models");

const { isAuthorized } = require("../../utils/tokenFunction");
const {
  getCached,
  caching,
  delCache,
} = require("../../utils/redis/cache.ctrl");
const axios = require("axios");

module.exports = {
  getAllReviews: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (userInfo.user_type === 3) {
      const result = await comments.findAll({
        include: [
          {
            attributes: ["id", "nickname", "profile_img"],
            model: users,
            as: "user",
          },
          {
            attributes: ["title"],
            model: exhibition,
            as: "exhibition",
          },
        ],
      });
      const data = result.map((el) => el.dataValues);

      res.status(200).json({ data });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
  approveExhibitions: async (req, res) => {
    //전체 전시 정보에서는 status 수정 하고
    //type 별 전시 정보에는 추가해야한다.

    const userInfo = isAuthorized(req);

    const { id, exhibit_type } = req.body.data;
    const redisKey =
      exhibit_type === undefined
        ? "allExhibition"
        : exhibit_type === 1
        ? "standard"
        : "premium";

    if (userInfo.user_type === 3) {
      const allExhibitionResult = await axios.get(
        "https://art-ground.link/exhibition"
      );
      const typeExhibitionResult = await axios.get(
        `https://art-ground.link/exhibition/${exhibit_type}`
      );

      const allExhibitionReply = allExhibitionResult.data.data;
      const typeExhibitionReply = typeExhibitionResult.data.data;
      allExhibitionReply.some((el) => {
        if (el.id === id) {
          el.status = 1;
          return true;
        }
      });
      typeExhibitionReply.push({ ...req.body.data });
      caching("allExhibition", allExhibitionReply);
      caching(redisKey, typeExhibitionReply);
      res.status(200).json({
        message: "exhibition successfully approved",
      });
      const result = await exhibition.findOne({
        where: {
          id,
        },
      });

      if (!result) {
        res.status(404).json({
          message: "exhibition not exist",
        });
      } else {
        await exhibition.update(
          {
            status: 1, // 전시 승인
          },
          {
            where: {
              id,
            },
          }
        );
      }
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
  closeExhibitions: async (req, res) => {
    const userInfo = isAuthorized(req);

    const { postId, type: exhibit_type } = req.params;
    const id = parseInt(postId);
    //전체 전시 정보에서는 status 수정 하고
    //type 별 전시 정보에는 삭제해야한다.
    const redisKey =
      exhibit_type === undefined
        ? "allExhibition"
        : exhibit_type === "1"
        ? "standard"
        : "premium";

    if (userInfo.user_type === 3) {
      let allExhibitionResult;
      let typeExhibitionResult;

      if (!(await getCached("allExhibition"))) {
        const result = await exhibition.findAll({
          include: [
            {
              model: images,
              as: "images",
            },
            {
              attributes: ["exhibition_id", "user_id"],
              model: likes,
              as: "likes",
            },
            {
              attributes: [
                "user_email",
                "nickname",
                "profile_img",
                "author_desc",
              ],
              model: users,
              as: "author",
            },
          ],
        });
        const data = result.map((el) => el.dataValues);
        caching("allExhibition", data);
        allExhibitionResult = data;
      } else {
        allExhibitionResult = await getCached("allExhibition");
      }

      if (!(await getCached(redisKey))) {
        const result = await exhibition.findAll({
          include: [
            {
              model: images,
              as: "images",
            },
            {
              attributes: ["exhibition_id", "user_id"],
              model: likes,
              as: "likes",
            },
            {
              attributes: [
                "user_email",
                "nickname",
                "profile_img",
                "author_desc",
              ],
              model: users,
              as: "author",
            },
          ],
          where: {
            exhibit_type,
            status: 1,
          },
        });

        const data = result.map((el) => el.dataValues);
        caching(redisKey, data);
        typeExhibitionResult = data;
      } else {
        typeExhibitionResult = await getCached(redisKey);
      }

      //let typeExhibitionResult;
      allExhibitionResult.some((el) => {
        if (el.id === id) {
          el.status = 2;
          return true;
        }
      });

      typeExhibitionResult.some((el, idx) => {
        if (el.id === id) {
          typeExhibitionResult.splice(idx, 1);
          return true;
        }
      });

      caching("allExhibition", allExhibitionResult);
      caching(redisKey, typeExhibitionResult);

      res.status(200).json({
        message: "successfully close exhibitions",
      });
      await exhibition.update(
        {
          status: 2, // 전시 종료
        },
        {
          where: {
            id,
          },
        }
      );
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
  deleteReviews: async (req, res) => {
    //const userInfo = isAuthorized(req);
    const userInfo = { user_type: 3 };
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
