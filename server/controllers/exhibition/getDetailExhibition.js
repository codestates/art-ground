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

module.exports.getDetailExhibition = async (req, res) => {
  const { postId: id } = req.params;

  const redisKey = `${id}Exhibition`;
  const likesRedisKey = `${id}likes`;
  const reply = await getCached(redisKey);
  const likesReply = await getCached(likesRedisKey);
  console.log(likesRedisKey);
  console.log(likesReply);

  if (reply) {
    const data = reply;
    if (!likesReply) {
      let likes;
      const result = await likeModel.findAll({
        raw: true,
        attributes: ["id", "user_id"],
        where: {
          exhibition_id: id,
        },
      });
      caching(likesRedisKey, result);
      likes = result;
      res.status(200).json({ data, likes });
    } else {
      let likes = likesReply;
      res.status(200).json({ data, likes });
    }
  } else {
    const result = await exhibitionModel.findOne({
      include: [
        {
          model: imagesModel,
          as: "images",
        },

        {
          attributes: ["user_email", "nickname", "profile_img", "author_desc"],
          model: userModel,
          as: "author",
        },
      ],
      where: {
        id,
        status: 1,
      },
    });

    const likesResult = await likeModel.findAll({
      raw: true,
      attributes: ["id", "user_id"],
      where: {
        exhibition_id: id,
      },
    });

    const likes = likesResult;
    const data = result.dataValues;
    caching(redisKey, data);
    caching(likesRedisKey, likes);
    res.status(200).json({ data, likes });
  }
};
