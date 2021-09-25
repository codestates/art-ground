const { likes } = require("../../models");

module.exports.withdrawalLike = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    console.log(userInfo);
    const { postId: exhibition_id } = req.body;
    const { id: user_id } = userInfo;
    console.log(likes);
    const result = await likes.destroy({ where: { exhibition_id, user_id } });

    if (result) {
      res.status(200).json({
        message: "successfully delete like",
      });
    }
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
