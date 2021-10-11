const { isAuthorized } = require("../../utils/tokenFunction");
const { users } = require("../../models");

module.exports = {
  getMyInfo: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (userInfo) {
      const { id } = userInfo;
      const result = await users.findOne({
        where: {
          id,
        },
      });
      const data = result.dataValues;
      res.status(200).json({
        data,
      });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
