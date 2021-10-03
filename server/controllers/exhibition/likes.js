const { isAuthorized } = require("../../utils/tokenFunction");
const { likes } = require("../../models");
module.exports = {
  exhibitionLike: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (userInfo) {
      const { postId: exhibition_id } = req.body;
      const { id: user_id } = userInfo;
      console.log(likes);
      const result = await likes.create({ exhibition_id, user_id });

      if (result) {
        res.status(201).json({
          message: "successfully add like",
        });
      }
    } else {
      res.status(401).json({
        message: "invalid user",
      });
    }
  },
};
//
