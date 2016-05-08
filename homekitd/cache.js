const R = require('ramda');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const crypto = require('crypto');
const os = require('os');


const getFilename = (key) => {
  const hasher = crypto.createHash('sha256');
  hasher.update(key);
  return `${os.tmpdir()}/homekit-${hasher.digest('hex')}.cache`;
};

const get = (key) => {
  return fs.readFileAsync(getFilename(key), 'utf8')
    .then(
      JSON.parse,
      (err) => {
        if (err.code == 'ENOENT') {
          return Promise.resolve(undefined);
        }
        throw err;
      }
    )
    .then((data) => {
      if (data === undefined || data.expires < +new Date()) {
        return undefined;
      }
      return data.data;
    });
};

const put = (key, value, ttl = 60) => {
  const payload = {
    data: value,
    expires: (+new Date() + ttl * 1000)
  };
  return fs.writeFileAsync(getFilename(key), JSON.stringify(payload), 'utf8');
};

module.exports.cached = (key, getter, expiry = 60, validator = R.identity) => {
  return get(key).then((val) => {
    if (validator(val)) {
      return R.merge({$cache: true}, val);
    }
    return getter().then((val) => {
      put(key, R.merge({$mtime: +new Date()}, val), expiry);
      return val;
    });
  });
};
