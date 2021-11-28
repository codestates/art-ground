const { isAuthorized } = require("../../utils/tokenFunction");
const { getHash } = require("../../utils/redis/ctrl/getCache.ctrl");

module.exports = {
  getMyInfo: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (userInfo) {
      res.status(200).json({
        data: await getHash(`user:${userInfo.id}`),
      });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
