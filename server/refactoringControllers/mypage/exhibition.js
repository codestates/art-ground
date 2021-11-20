const {
  getSet,
  getHashValue,
} = require("../../utils/redis/ctrl/getCache.ctrl");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports.getMyExhibition = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { id } = userInfo;

    const data = await Promise.all(
      map(await getSet(`exhibition:user:${id}`), async (exhibitionId) => {
        const [exhibition, author, images] = await Promise.all([
          await getHashValue(
            `exhibition:${exhibitionId}`,
            "id",
            "status",
            "title",
            "start_date",
            "end_date"
          ),
          await getHashValue(`user:${id}`, "nickname"),
          await getList(`images:${exhibitionId}`, 0, 0),
        ]);

        return {
          ...exhibition,
          author,
          images: [
            { image_urls: images[0].image_urls, title: images[0].title },
          ],
        };
      })
    );
    if (data) res.status(200).json({ data, message: "ok" });
    else res.status(204).json({ message: "Data Not Found" });
  } else {
    res.status(401).json({
      message: "invalid access token",
    });
  }
};
