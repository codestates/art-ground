const { users: userModel } = require("../../models");
const { redisClient } = require("../../utils/redis");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports.modifyMyInfo = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { id } = userInfo;
    const {
      profileImg: profile_img,
      authorDesc: author_desc,
      nickName: nickname,
    } = req.body.userData;

    const result = await userModel.update(
      { nickname, profile_img, author_desc },
      { where: { id } }
    );

    if (result) {
      redisClient.flushall();
      res.status(200).json({ message: "profile changed" });
    }
  } else {
    res.status(401).json({
      message: "invalid access token",
    });
  }
};
