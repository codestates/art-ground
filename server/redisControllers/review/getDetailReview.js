const { comments, users } = require("../../models");

module.exports.getDetailReview = async (req, res) => {
  const { postId: exhibition_id } = req.params;
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

  if (result) {
    res.status(200).json({ data });
  }
};
