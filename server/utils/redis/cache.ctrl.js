const { redisClient } = require("./index");

module.exports = {
  initialize: () => {
    //TODO
    /*
      존재하는 exhibition 별로 캐싱 함수 만들기
      ex)exhibition:85
      존재하는 like 캐싱 함수 만들기
      ex)like:64
      Review 캐싱 함수만들기
      review:82
      allExhibition 캐싱 함수 만들기
      primeum 함수 만들기
      standard 함수 만들기
     
     */
  },
  getStringCached: (key) => {
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
  isInSet: (key, value) => {
    return new Promise((resolve, reject) => {
      redisClient.SISMEMBER(key, value, (err, data) => {
        return resolve(!!data);
      });
    });
  },
  addToSet: async (key, value) => {
    await redisClient.SADD(key, value);
  },
  removeFromSet: async (key, value) => {
    await redisClient.SREM(key, value);
  },
  getLikeCache: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.SMEMBERS(key, (err, data) => {
        resolve(data);
      });
    });
  },
  getList: (key, start, stop) => {
    return new Promise((resolve, reject) => {
      redisClient.lrange(key, start, stop, (err, data) => {
        resolve(data);
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
