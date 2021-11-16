const {
  exhibitionCacheInitialization,
  userCacheInitialization,
  imageCacheInitialization,
  likeCacheInitialization,
  commentCacheInitialization,
} = require("./ctrl/cacheInit.ctrl");
module.exports = {
  cacheInitialization: async () => {
    await exhibitionCacheInitialization();
    await userCacheInitialization();
    await imageCacheInitialization();
    await likeCacheInitialization();
    await commentCacheInitialization();
  },
};
