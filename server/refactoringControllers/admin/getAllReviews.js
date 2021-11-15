const { exhibition, comments, users } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  getAllReviews: async (req, res) => {
    const userInfo = isAuthorized(req);

    //if (userInfo.user_type === 3) {
    const result = await comments.findAll({
      include: [
        {
          attributes: ["id", "nickname", "profile_img"],
          model: users,
          as: "user",
        },
        {
          attributes: ["title"],
          model: exhibition,
          as: "exhibition",
        },
      ],
    });
    const data = result.map((el) => el.dataValues);

    res.status(200).json({ data });
    // } else {
    //   res.status(401).json({
    //     message: "invalid access token",
    //   });
    // }
  },
};
//
