const { map } = require("underscore");
const {
  getSet,
  getHash,
  getHashValue,
  getList,
} = require("../../utils/redis/ctrl/getCache.ctrl");

module.exports.getDetailExhibition = async (req, res) => {
  const { postId: id } = req.params;

  const exhibitionReply = await getHash(`exhibition:${id}`);
  const imagesReply = await getList(`images:${id}`, 0, -1);
  const userReply = await getHashValue(
    `user:${exhibitionReply.author_id}`,
    "user_email",
    "nickname",
    "profile_img",
    "author_desc"
  );
  const likesReply = map(await getSet(`like:${id}`), (el) => {
    return Number.parseInt(el);
  });

  if (exhibitionReply && likesReply) {
    res.status(200).json({
      data: { ...exhibitionReply, author: userReply, images: imagesReply },
      likes: likesReply,
    });
  } else {
    res.status(404).json({
      message: "failed",
    });
  }
};
