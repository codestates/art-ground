const { comments, users } = require("../../models");
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
    res.status(200).json({ data });
  } else {
    const result = await comments.findAll({
      include: [
        {
          attributes: ["nickname", "profile_img"],
          model: users,
          as: "user",
        },
      ],
      where: {
        exhibition_id,
      },
    });
    const data = result.map((el) => el.dataValues);
    caching(redisKey, data);
    res.status(200).json({ data });
  }
};
