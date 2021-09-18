const { isAuthorized } = require("../tokenFunction/index");
module.exports = {
  getMyInfo: (req, res) => {
    const authorization = req.headers.cookie;

    isAuthorized(authorization);
  },
};
