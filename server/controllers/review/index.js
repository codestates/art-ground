const { comments: commentsModel, users: userModel } = require("../../models");

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
    where: exhibition_id,
  });

  if (result) {
    const data = result.dataValues;
    res.status(200).json({ data });
  } else {
    res.status(404).json({ message: "failed" });
  }
};
