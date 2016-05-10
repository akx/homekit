const {cached} = require('./cache');
const fetch = require('node-fetch');

function getData(stopId) {
  return fetch(`http://data.foli.fi/siri/sm/${stopId}`)
    .then((resp) => resp.json());
}

module.exports = (stopId) => (
  cached(
    `foli-${stopId}`,
    () => getData(stopId),
    60
  )
);
