const { isAuthorized } = require("../../utils/tokenFunction");
require("dotenv").config();

module.exports = {
  getMyInfo: (req, res) => {
    const userInfo = isAuthorized(req);
    console.log(userInfo);
    if (userInfo) {
      res.status(200).json({
        data: userInfo,
      });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
