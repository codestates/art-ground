const { map, mapObject, reduce } = require("underscore");
const { redisClient } = require("../index");

function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a);
        };
  };
}

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
  isInSet: _curryr(function (key, value) {
    return new Promise((resolve, reject) => {
      redisClient.SISMEMBER(key, value, (err, data) => {
        return resolve(!!data);
      });
    });
  }),
  getHash: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.hgetall(key, (err, data) => {
        resolve(
          mapObject(data, (val, key) => {
            return JSON.parse(val);
          })
        );
      });
    });
  },

  getHashValue: (key, ...arg) => {
    return new Promise((resolve, reject) => {
      redisClient.hmget(key, ...arg, (err, data) => {
        resolve(
          reduce(
            data,
            (acc, cur, idx) => {
              return Object.assign(acc, { [arg[idx]]: JSON.parse(cur) });
            },
            {}
          )
        );
      });
    });
  },
};
