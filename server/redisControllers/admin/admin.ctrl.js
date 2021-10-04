const { exhibition, comments, users } = require("../../models");

const { isAuthorized } = require("../../utils/tokenFunction");
const {
  getCached,
  caching,
  delCache,
} = require("../../utils/redis/cache.ctrl");
const axios = require("axios");
module.exports = {
  getAllReviews: async (req, res) => {
    //const userInfo = isAuthorized(req);
    const userInfo = { user_type: 3 };
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
        : exhibit_type === "1"
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

    const { postId: id, type: exhibit_type } = req.params;

    //전체 전시 정보에서는 status 수정 하고
    //type 별 전시 정보에는 삭제해야한다.
    const redisKey =
      exhibit_type === undefined
        ? "allExhibition"
        : exhibit_type === "1"
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
          el.status = 2;
          return true;
        }
      });
      typeExhibitionReply.some((el, idx) => {
        if (el.id === id) {
          typeExhibitionReply.splice(idx, 1);
          return true;
        }
      });

      caching("allExhibition", allExhibitionReply);
      caching(redisKey, typeExhibitionReply);
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
    const userInfo = isAuthorized(req);
    const { postId: exhibition_id, commentId: id } = req.params;
    //전시 리뷰에서 리뷰삭제.
    //디테일 리뷰에서 리뷰삭제..
    if (userInfo.user_type === 3) {
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
        DetailReview.some((el, idx) => {
          if (el.id === id) {
            DetailReview.splice(idx, 1);

            return true;
          }
        });
        caching(reviewRedisKey, DetailReview);
        caching(redisKey, reply);
      }
      res.status(200).json({
        message: "successfully delete comments",
      });
      comments
        .findOne({
          where: {
            id,
          },
        })
        .then((data) => {
          console.log("data:".data);
          if (!data) {
            res.status(404).json({
              message: "comment not exist",
            });
          } else {
            exhibition.destroy({
              where: {
                id,
              },
            });
          }
        })
        .then((result) => {
          console.log("result:", result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
