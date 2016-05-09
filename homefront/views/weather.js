import m from 'mithril';
import R from 'ramda';
import moment from 'moment';

const formatHourlyColumn = (data) => {
  if (data.time * 1000 < +new Date()) return;
  return m('div.hr', [
    m('div.time', moment.unix(data.time).format('HH')),
    m('div.temp', formatTemperature(data.temperature)),
    m('div.summary', data.summary)
  ]);
};

const formatTemperature = (val) => `${parseFloat(val).toFixed(1)} \u00B0C`;

const weatherView = (data) => m(
  'section.weather.current',
  [
    m('div.title', 'Weather'),
    m('div.columns', [
      m('div', [
        m('div.temp', formatTemperature(data.forecast.currently.temperature)),
        m('div.current', data.forecast.currently.summary)
      ]),
      m('div.summary', [
        m('div.hourly-summary', data.forecast.hourly.summary),
        m('div.daily-summary', data.forecast.daily.summary)
      ]),
      (data.forecast.currently.precipProbability ? m('div.precip', `${data.forecast.currently.precipProbability}% chance of rain`) : null),
      m('div.wind', [
        m('div', `${data.forecast.currently.windSpeed} m/s`),
        m('div',
          `${data.forecast.currently.windBearing} \u00B0 `,
          m('div.arrow', {style: `transform:rotate(${data.forecast.currently.windBearing - 90}deg)`}, '\u27a4')
        )
      ])
    ]),
    m('div.columns.hourly', R.map(
      formatHourlyColumn,
      R.take(12, data.forecast.hourly.data)
    ))
  ]
);

export default weatherView;
