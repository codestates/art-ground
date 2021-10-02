const { redisClient } = require("./index");

module.exports = {
  getCached: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, reply) => {
        if (reply) {
          console.log(`Success Read ${key}`);
          console.log(typeof JSON.parse(reply));
          resolve(JSON.parse(reply));
        } else {
          resolve(null);
        }
      });
    });
  },

  caching: async (key, data) => {
    console.log(key);
    console.log(data);
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
