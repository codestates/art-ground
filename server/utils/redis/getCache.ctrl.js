const { map, reject } = require("underscore");
const { redisClient } = require("./index");

module.exports = {
  getStringCache: (key) => {
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
  getSetCache: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.SMEMBERS(key, (err, data) => {
        resolve(data);
      });
    });
  },
  getListCache: (key, start, stop) => {
    return new Promise((resolve, reject) => {
      redisClient.lrange(key, start, stop, (err, data) => {
        const convertedData = map(data, (el) => {
          return JSON.parse(el);
        });
        resolve(convertedData);
      });
    });
  },
  isInSet: (key, value) => {
    return new Promise((resolve, reject) => {
      redisClient.SISMEMBER(key, value, (err, data) => {
        return resolve(!!data);
      });
    });
  },
  getHashCache: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.hgetall(key, (err, data) => {
        resolve(data);
      });
    });
  },
};
