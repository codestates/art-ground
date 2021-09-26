const { users: userModel } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports.withdrawal = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { id } = userInfo;

    const result = await userModel.destroy({
      where: {
        id,
      },
    });

    if (result) {
      res.status(200).json({
        message: "successfully deleted",
      });
    }
  } else {
    res.status(401).json({
      message: "invalid access token",
    });
  }
};
