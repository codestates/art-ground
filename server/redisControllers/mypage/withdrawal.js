const { users } = require("../../models");
const { redisClient } = require("../../utils/redis");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports.withdrawal = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { id } = userInfo;

    const result = await users.destroy({
      where: {
        id,
      },
    });

    //comments = user_id
    //exhibition = author_id
    if (result) {
      redisClient.flushall();
      res
        .clearCookie("accessToken", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
          domain: "art-ground.link", // 쿠키 옵션 추가
        })
        .status(200)
        .json({
          message: "successfully deleted",
        });
    }
  } else {
    res.status(401).json({
      message: "invalid access token",
    });
  }
};
