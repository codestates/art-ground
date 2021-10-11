const { exhibition, comments, users, images, likes } = require("../../models");

const { isAuthorized } = require("../../utils/tokenFunction");
const { getCached, caching } = require("../../utils/redis/cache.ctrl");
module.exports = {
  approveExhibitions: async (req, res) => {
    const userInfo = isAuthorized(req);

    const { id, exhibit_type } = req.body.data;
    const redisKey =
      exhibit_type === undefined
        ? "allExhibition"
        : exhibit_type === 1
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

      allExhibitionResult.some((el) => {
        if (el.id === id) {
          el.status = 1;
          return true;
        }
      });
      typeExhibitionResult.push({ ...req.body.data });
      caching("allExhibition", allExhibitionResult);
      caching(redisKey, typeExhibitionResult);
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
};
//
