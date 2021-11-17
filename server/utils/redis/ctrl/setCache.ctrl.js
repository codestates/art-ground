const { redisClient } = require("../index");

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
  addToList: async (key, data) => {
    await redisClient.rpush(key, JSON.stringify(data));
  },
  setHash: async (key, field, value) => {
    try {
      await redisClient.hset(key, field, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  },
  removeHash: async (key) => {
    await redisClient.hkeys(key, (err, data) => {
      console.log(data);
      redisClient.hdel(key, ...data);
    });
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
