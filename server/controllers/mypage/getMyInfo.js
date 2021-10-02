const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  getMyInfo: (req, res) => {
    const userInfo = isAuthorized(req);

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
//
