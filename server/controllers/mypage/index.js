const { isAuthorized } = require("../tokenFunction/index");
require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

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
