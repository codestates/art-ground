const { each } = require("underscore");
const { users } = require("../../models");
const { getSet } = require("../../utils/redis/ctrl/getCache.ctrl");
const { removeFromSet } = require("../../utils/redis/ctrl/setCache.ctrl");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports.withdrawal = async (req, res) => {
  const userInfo = isAuthorized(req);
  addToSet(`like:${exhibition_id}`, user_id);
  addToSet(`user:like:${user_id}`, exhibition_id);
  if (userInfo) {
    const { id } = userInfo;
    await removeHash(`user:${id}`);
    await removeSet(`user:like:${id}`);
    each(await getSet("allExhibition"), async (exhibitionId) => {
      await removeFromSet(`like:${exhibitionId}`, id);
    });
    const result = await users.destroy({
      where: {
        id,
      },
    });

    if (result) {
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
