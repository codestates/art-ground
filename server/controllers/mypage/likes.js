/**
 * SELECT exhibition_id
 * FROM likes
 * WHERE user_id = userInfo.id
 *
 *
 * SELECT *
 * FROM exhibition
 * WHERE id in ()
 */

const { likes, exhibition } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports.getMyLikes = async (req, res) => {
  const userInfo = isAuthorized(req);
  const { id: user_id } = userInfo;

  const exhibitionId = await likes.findAll({
    attributes: ["exhibition_id"],
    where: {
      user_id,
    },
  });
};
