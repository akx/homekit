const {cached} = require('./cache');
const fetch = require('node-fetch');
const {sprintf} = require('sprintf-js');

const FORECAST_API_KEY = process.env.FORECAST_API_KEY;

function getData(lat, lon) {
  if (!FORECAST_API_KEY) {
    return Promise.reject('No valid FORECAST_API_KEY');
  }
  const url = sprintf(
    'https://api.forecast.io/forecast/%s/%.4f,%.4f?units=si',
    FORECAST_API_KEY, lat, lon
  );
  return fetch(url).then((res) => res.json());
}

module.exports = (lat, lon) => {
  return cached(
    `forecast-${lat},${lon}`,
    () => getData(lat, lon),
    60 * 10
  );
};
