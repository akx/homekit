const fetch = require('node-fetch');
const R = require('ramda');

module.exports = (stopId) => {
  return fetch('http://data.foli.fi/siri/sm/' + stopId)
    .then((resp) => resp.json())
    .then(R.merge({$mtime: +new Date()}));
};
