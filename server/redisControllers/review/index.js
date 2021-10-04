const {
  exhibition: exhibitionModel,
  images: imagesModel,
  users: userModel,
  comments: commentsModel,
  sequelize,
} = require("../../models");
const {
  getCached,
  caching,
  delCache,
} = require("../../utils/redis/cache.ctrl");
//작가 관련 정보 {이름}
//전시 타입 1, 2
//스탠다드 프리미엄 둘 다
module.exports.getExhibitionReview = async (req, res) => {
  const redisKey = "exhibitionReview";

  const reply = await getCached(redisKey);

  if (reply) {
    const data = reply;
    res.status(200).json({ data });
  } else {
    const result = await exhibitionModel.findAll({
      include: [
        {
          model: imagesModel,
          as: "images",
        },
        {
          attributes: ["nickname", "profile_img", "author_desc"],
          model: userModel,
          as: "author",
        },
        {
          model: commentsModel,
          as: "comments",
        },
      ],
      where: {
        status: [1, 2],
      },
    });
    const { dataValues: lastCommentId } = await commentsModel.findOne({
      attributes: ["id"],
      order: [[sequelize.literal("createdAt"), "desc"]],
    });

    const data = result.map((el) => el.dataValues);

    caching(redisKey, data);
    caching("lastCommentId", lastCommentId.id);
    res.status(200).json({ data });
  }
};

/**
 * const {
  exhibition: exhibitionModel,
  comments: commentsModel,
  users: userModel,
} = require("../../models");
//작가 관련 정보 {이름}
//전시 타입 1, 2
//스탠다드 프리미엄 둘 다

module.exports.getReviewPage = async (req, res) => {
  const { postId: exhibition_id } = req.params;
  const result = await commentsModel.findAll({
    include: [
      {
        attributes: ["nickname", "profile_img"],
        model: userModel,
        as: "user",
      },
    ],
    where: { exhibition_id: parseInt(exhibition_id) },
  });

  if (result) {
    const data = result.map((el) => el.dataValues);
    console.log(data);
    res.status(200).json({ data });
  } else {
    res.status(404).json({ message: "failed" });
  }
};

 */
