const {
  exhibition: exhibitionModel,
  images: imagesModel,
  users: userModel,
  likes: likeModel,
} = require("../../models");
const {
  getCached,
  caching,
  delCache,
} = require("../../utils/redis/cache.ctrl");
module.exports.getExhibition = async (req, res) => {
  const { type: exhibit_type } = req.params;
  const redisKey =
    exhibit_type === undefined
      ? "allExhibition"
      : exhibit_type === "1"
      ? "standard"
      : "premium";

  //캐시 확인 과정
  const reply = await getCached(redisKey);

  if (reply) {
    //캐시가 존재한다.
    const data = reply;
    res.status(200).json({ data });
  } else {
    //캐시가 존재하지 않음
    if (!exhibit_type) {
      const result = await exhibitionModel.findAll({
        include: [
          {
            model: imagesModel,
            as: "images",
          },
          {
            attributes: ["exhibition_id", "user_id"],
            model: likeModel,
            as: "likes",
          },
          {
            attributes: [
              "user_email",
              "nickname",
              "profile_img",
              "author_desc",
            ],
            model: userModel,
            as: "author",
          },
        ],
      });
      const data = result.map((el) => el.dataValues);
      caching(redisKey, data);
      res.status(200).json({ data });
    } else {
      const result = await exhibitionModel.findAll({
        include: [
          {
            model: imagesModel,
            as: "images",
          },
          {
            attributes: ["exhibition_id", "user_id"],
            model: likeModel,
            as: "likes",
          },
          {
            attributes: [
              "user_email",
              "nickname",
              "profile_img",
              "author_desc",
            ],
            model: userModel,
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
      res.status(200).json({ data });
    }
  }
};
