const fetch = require('node-fetch');
const uid = require('./uid');
const R = require('ramda');

module.exports = (storeId) => {
  const cb = uid('u');
  return fetch(
    'http://www.k-ruoka.fi/api/usertools/GetUserStoreSpecifics?callback=' + cb,
    {
      headers: {
        'Cookie': `UserStores=UserStores=${storeId}`,
        'Referer': 'http://www.k-ruoka.fi/'
      }
    }
  )
    .then((res) => res.text())
    .then((text) => {
      const re = new RegExp('^' + cb + '\\((\\[.+\\])\\);');
      const m = re.exec(text);
      if (!m) {
        return Promise.reject('Unable to parse K-Market response');
      }
      return JSON.parse(m[1])[0];
    })
    .then(R.merge({$mtime: +new Date()}));
};
