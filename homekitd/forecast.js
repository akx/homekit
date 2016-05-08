const fetch = require('node-fetch');
const R = require('ramda');
const {sprintf} = require('sprintf-js');

const FORECAST_API_KEY = process.env.FORECAST_API_KEY;

module.exports = (lat, lon) => {
  if (!FORECAST_API_KEY) {
    return Promise.reject('No valid FORECAST_API_KEY');
  }
  const url = sprintf(
    'https://api.forecast.io/forecast/%s/%.4f,%.4f?units=si',
    FORECAST_API_KEY, lat, lon
  );
  return fetch(url)
    .then((res) => res.json())
    .then(R.merge({$mtime: +new Date()}));
};
