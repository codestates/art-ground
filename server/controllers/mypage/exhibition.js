const { exhibition } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports.getMyExhibition = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { id: user_id } = userInfo;
    const result = exhibition.findAll({
      where: {
        user_id,
      },
    });

    if (result) {
      const data = result.map((el) => el.dataValues);

      res.status(200).json({ data });
    }
  } else {
    res.status(401).json({
      message: "invalid access token",
    });
  }
};
