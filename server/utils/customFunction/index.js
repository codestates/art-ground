const {
  addToSet,
  addToList,
  setHash,
  removeFromSet,
} = require("../redis/ctrl/setCache.ctrl");
const {
  getSet,
  getHash,
  getHashValue,
  getList,
} = require("../../utils/redis/ctrl/getCache.ctrl");

const { map, keys, each } = require("underscore");
const setGrading = async (type, id) => {
  type === 1 ? await addToSet("standard", id) : await addToSet("premium", id);
};

const getLikes = async (exhibitionId) => {
  return map(await getSet(`like:${exhibitionId}`), (el) => {
    return Number.parseInt(el);
  });
};
module.exports = {
  setGrading,
  getTotalExhibitionData: async (exhibitionId) => {
    const exhibitionReply = await getHash(`exhibition:${exhibitionId}`);

    return {
      ...exhibitionReply,
      author: await getHashValue(
        `user:${exhibitionReply.author_id}`,
        "user_email",
        "nickname",
        "profile_img",
        "author_desc"
      ),
      images: await getList(`images:${exhibitionId}`, 0, -1),
      likes: await getLikes(exhibitionId),
    };
  },
  getLikes,
  setExhibitionCache: (exhibitionData) => {
    const { id, exhibit_type, status, author_id } = exhibitionData;
    const exhibitionDataKeys = keys(exhibitionData);

    each(exhibitionDataKeys, (el) => {
      setHash(`exhibition:${id}`, `${el}`, exhibitionData[el]);
    });
    addToSet(`exhibition:user:${author_id}`, id);
    addToSet("allExhibition", id);
    if (status === 1) setGrading(exhibit_type, id);
    if (status === 2) addToSet("closedExhibition", id);
  },
  setImageCache: (imageData) => {
    addToList(`images:${imageData.exhibition_id}`, imageData);
  },
  addLikes: async (exhibition_id, user_id) => {
    await addToSet(`like:${exhibition_id}`, user_id);
    await addToSet(`user:like:${user_id}`, exhibition_id);
  },
  withdrawalLike: async (exhibition_id, user_id) => {
    await removeFromSet(`like:${exhibition_id}`, user_id);
    await removeFromSet(`user:like:${user_id}`, exhibition_id);
  },
  signUpCaching: async (data) => {
    delete data.password;
    each(keys(data), async (key) => {
      await setHash(`user:${data.id}`, key, data[key]);
    });
  },
};
