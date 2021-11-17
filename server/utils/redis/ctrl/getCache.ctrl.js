const { map, reject, mapObject } = require("underscore");
const { redisClient } = require("../index");

module.exports = {
  getString: (key) => {
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
  getSet: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.SMEMBERS(key, (err, data) => {
        resolve(data);
      });
    });
  },
  getList: (key, start, stop) => {
    return new Promise((resolve, reject) => {
      redisClient.lrange(key, start, stop, (err, data) => {
        resolve(
          map(data, (el) => {
            return JSON.parse(el);
          })
        );
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
  getHash: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.hgetall(key, (err, data) => {
        resolve(
          mapObject(data, (val, key) => {
            if (key === "createdAt" || key === "updatedAt") {
              return Date(val);
            }
            return JSON.parse(val);
          })
        );
      });
    });
  },
  getHashValue: (key, filed) => {
    return new Promise((resolve, reject) => {
      redisClient.hget(key, filed, (err, data) => {
        resolve(JSON.parse(data));
      });
    });
  },
};
