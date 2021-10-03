const {
  exhibition: exhibitionModel,
  images: imagesModel,
  users: userModel,
  likes: likeModel,
} = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports.getMyExhibition = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { id: author_id } = userInfo;
    // const result = await exhibition.findAll({
    //   where: {
    //     user_id,
    //   },
    // });

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
        author_id,
      },
    });
    if (result.length) {
      const data = result.map((el) => el.dataValues);

      res.status(200).json({ data, message: "ok" });
    } else {
      res.status(204).json({ message: "Data Not Found" });
    }
  } else {
    res.status(401).json({
      message: "invalid access token",
    });
  }
};
