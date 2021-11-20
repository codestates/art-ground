const { getTotalExhibitionData } = require("../../utils/customFunction");

getTotalExhibitionData;
module.exports.getDetailExhibition = async (req, res) => {
  const { postId: id } = req.params;

  if (exhibitionReply && likesReply) {
    res.status(200).json({
      data: await getTotalExhibitionData(id),
    });
  } else {
    res.status(404).json({
      message: "failed",
    });
  }
};
