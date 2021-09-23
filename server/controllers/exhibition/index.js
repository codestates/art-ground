const {
  exhibition: exhibitionModel,
  images: imagesModel,
  users: userModel,
  likes: likeModel,
} = require("../../models");

module.exports.getExhibition = async (req, res) => {
  const { type: exhibit_type } = req.params;
  const result = await exhibitionModel.findAll({
    include: [
      {
        model: imagesModel,
        as: "images",
      },
      {
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
      exhibit_type,
    },
  });
  const data = result.map((el) => el.dataValues);

  res.status(200).json({ data });
};
