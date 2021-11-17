const {
  exhibition,
  images,
  users,
  likes,
  comments,
} = require("../../../models");
const { each, keys, filter } = require("underscore");
const { addToList, setHash, addToSet } = require("./setCache.ctrl");
const { findAll, findOne } = require("../../dbFunction");
const { setGrading } = require("../../customFunction");

const setExhibitionCache = (exhibitionData) => {
  const { id, exhibit_type, status } = exhibitionData;
  const exhibitionDataKeys = keys(exhibitionData);

  each(exhibitionDataKeys, (el) => {
    setHash(`exhibition:${id}`, `${el}`, exhibitionData[el]);
  });
  addToSet("allExhibition", id);
  if (status === 1) setGrading(exhibit_type, id);
};

const setUserCache = (userData) => {
  const { id } = userData;
  const userDataKeys = keys(userData);
  each(userDataKeys, (el) => {
    setHash(`user:${id}`, `${el}`, userData[el]);
  });
};

const setLikeCache = (likeData) => {
  addToSet(`like:${likeData.exhibition_id}`, likeData.user_id);
};

const setImageCache = (imageData) => {
  addToList(`images:${imageData.exhibition_id}`, imageData);
};

const setCommentCache = (commentData) => {
  addToSet("allComments", commentData.id);
  addToList(`comment:${commentData.exhibition_id}`, commentData);
};

module.exports = {
  exhibitionCacheInitialization: async () => {
    each(
      await findAll(exhibition, {
        raw: true,
      }),
      (el) => setExhibitionCache(el)
    );
  },
  imageCacheInitialization: async () => {
    each(await findAll(images, { raw: true }), (el) => setImageCache(el));
  },
  userCacheInitialization: async () => {
    each(await findAll(users, { raw: true }), (el) => setUserCache(el));
  },
  likeCacheInitialization: async () => {
    each(await findAll(likes, { raw: true }), (el) => setLikeCache(el));
  },
  commentCacheInitialization: async () => {
    each(
      await findAll(comments, {
        attributes: ["id", "exhibition_id", "user_id", "comments", "createdAt"],
        raw: true,
      }),
      (el) => setCommentCache(el)
    );
  },

  addExhibition: async (exhibitionId) => {
    setExhibitionCache(
      await findOne(exhibition, {
        raw: true,
        where: { status: 1, id: exhibitionId },
      })
    );
  },
};
