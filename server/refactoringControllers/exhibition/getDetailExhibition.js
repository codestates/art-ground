const {
  exhibition: exhibitionModel,
  images: imagesModel,
  users: userModel,
  likes: likeModel,
} = require("../../models");
const { getSetCached, caching } = require("../../utils/redis/cache.ctrl");

module.exports.getDetailExhibition = async (req, res) => {
  const { postId: id } = req.params;

  const redisKey = `exhibition:${id}`;
  const likesRedisKey = `likes:${id}`;

  const exhibitionReply = await getCached(redisKey);
  const likesReply = await getLikeCache(likesRedisKey);

  if (exhibitionReply) {
    const data = exhibitionReply;
    const likes = likesReply;
    res.status(200).json({ data, likes });
  } else {
    // 부수효과 나중에 한 번에 처리하기
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
