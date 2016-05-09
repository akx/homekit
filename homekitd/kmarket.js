const {cached} = require('./cache');
const fetch = require('node-fetch');
const R = require('ramda');
const uid = require('./uid');
const moment = require('moment');

const getDateStamp = () => moment().format('YYYY-MM-DD');

function downloadData(storeId) {
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
    .then(R.merge({
      $date: getDateStamp()
    }));
}

module.exports = (storeId) => {
  return cached(
    `kmarket-${storeId}`,
    () => downloadData(storeId),
    60 * 10,
    (val) => (val && val.$date == getDateStamp())
  );
};
