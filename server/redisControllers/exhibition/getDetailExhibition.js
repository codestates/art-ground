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
  const reply = await getCached(redisKey);

  if (reply) {
    const data = reply;
    res.status(200).json({ data });
  } else {
    const result = await exhibitionModel.findOne({
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

    const data = result.dataValues;
    caching(redisKey, data);
    res.status(200).json({ data });
  }
};
