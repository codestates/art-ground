const { users: userModel } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports.modifyMyInfo = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { id } = userInfo;
    const {
      profileImg: profile_img,
      authorDesc: author_desc,
      nickName: nickname,
    } = req.body;

    const result = await userModel.update(
      { nickname, profile_img, author_desc },
      { where: { id } }
    );

    if (result) {
      const data = result.dataValues;
      res.status(200).json({ data, message: "profile changed" });
    }
  } else {
    res.status(401).json({
      message: "invalid access token",
    });
  }
};
