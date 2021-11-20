const { keys, each } = require("underscore");
const { users: userModel } = require("../../models");
const { update } = require("../../utils/dbFunction");
const { setHash } = require("../../utils/redis/ctrl/setCache.ctrl");
const { isAuthorized } = require("../../utils/tokenFunction");

const setUserInfo = async (userData, id) => {
  each(keys(userData), (key) => {
    await setHash(`user:${id}`, key, userData[key]);
  });
};
module.exports.modifyMyInfo = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { id } = userInfo;
    const userData = req.body.userData;
    await setUserInfo(userData, id);

    res.status(200).json({ message: "profile changed" });
    await update(
      userModel,
      { nickname, profile_img, author_desc },
      { where: { id } }
    );
  } else {
    res.status(401).json({
      message: "invalid access token",
    });
  }
};
