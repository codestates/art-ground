const e = require("express");
const { comments, users, exhibition, images } = require("../../models");
const {
  getCached,
  caching,
  delCache,
} = require("../../utils/redis/cache.ctrl");

module.exports.getDetailReview = async (req, res) => {
  const { postId: exhibition_id } = req.params;

  const redisKey = `${exhibition_id}Review`;
  const reply = await getCached(redisKey);

  if (reply) {
    const data = reply;
    res.status(200).json({ ...data });
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
      attributes: ["id", "title", "start_date", "end_date", "genre_hashtags"],

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
    caching(redisKey, { commentsData, exhibitionData, thumbnail });
    res.status(200).json({ commentsData, exhibitionData, thumbnail });
  }
};
