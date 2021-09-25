const {
  exhibition: exhibitionModel,
  images: imagesModel,
  users: userModel,
  comments: commentsModel,
} = require("../../models");
//작가 관련 정보 {이름}
//전시 타입 1, 2
//스탠다드 프리미엄 둘 다
module.exports.getExhibitionReview = async (req, res) => {
  const commentsResult = await commentsModel.find;
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
  const data = result.map((el) => el.dataValues);

  res.status(200).json({ data });
};
