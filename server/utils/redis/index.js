module.exports = {
  redisClient: require("redis").createClient(),
  getCache: require("./getCache.ctrl"),
  setCache: require("./setCache.ctrl"),
  initializationCache: require("./initialization.ctrl"),
};
