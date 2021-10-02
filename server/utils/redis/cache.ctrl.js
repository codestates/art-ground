const { redisClient } = require("./index");

module.exports = {
  getCached: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, reply) => {
        if (reply) {
          console.log(`Success Read ${key}`);
          resolve(JSON.parse(reply));
        } else {
          resolve(null);
        }
      });
    });
  },

  caching: (key, data) => {
    redisClient.set(key, JSON.stringify(data));
  },
  delCache: (key) => {
    redisClient.del(key);
  },
};
