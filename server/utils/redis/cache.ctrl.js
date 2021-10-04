const { redisClient } = require("./index");

module.exports = {
  getCached: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, reply) => {
        if (reply) {
          resolve(JSON.parse(reply));
        } else {
          resolve(null);
        }
      });
    });
  },

  caching: async (key, data) => {
    await redisClient.set(key, JSON.stringify(data));
  },
  delCache: (key) => {
    redisClient.del(key);
  },
  cacheIncr: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.incr(key, (err, data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(null);
        }
      });
    });
  },
};
