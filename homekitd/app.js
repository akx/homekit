const express = require('express');
const kmarket = require('./kmarket');
const forecast = require('./forecast');
const foli = require('./foli');
const Promise = require('bluebird');
const morgan = require('morgan');
const cors = require('cors');


module.exports = () => {
  const app = express();
  app.use(morgan('combined'));
  app.use(cors());

  app.get('/data', (req, res) => {
    Promise.props({
      kmarket: kmarket('K624'),
      foli: foli('456'),
      forecast: forecast(60.455, 22.25)
    }).then((data) => {
      res.json(data);
    });
  });
  return app;
};
