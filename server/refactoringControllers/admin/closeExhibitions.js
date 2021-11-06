const { exhibition, comments, users, images, likes } = require("../../models");

const { isAuthorized } = require("../../utils/tokenFunction");
const { getCached, caching } = require("../../utils/redis/cache.ctrl");
module.exports = {
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
};
//
