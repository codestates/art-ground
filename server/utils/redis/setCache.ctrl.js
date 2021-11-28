const { redisClient } = require("./index");

module.exports = {
  addToSet: async (key, value) => {
    await redisClient.SADD(key, value);
  },

  removeFromSet: async (key, value) => {
    await redisClient.SREM(key, value);
  },
  setString: async (key, data) => {
    await redisClient.set(key, JSON.stringify(data));
  },
  setList: async (key, data) => {
    await redisClient.rpush(key, JSON.stringify(data));
  },
  setHash: async (key, field, value) => {
    await redisClient.hset(key, field, value);
  },
  incrId: (key) => {
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
