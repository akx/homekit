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

const weatherView = (forecast) => (forecast ? m(
  'section.weather.current',
  [
    m('div.title', 'Weather'),
    m('div.columns', [
      m('div', [
        m('div.temp', formatTemperature(forecast.currently.temperature)),
        m('div.current', forecast.currently.summary)
      ]),
      m('div.summary', [
        m('div.hourly-summary', forecast.hourly.summary),
        m('div.daily-summary', forecast.daily.summary)
      ]),
      (forecast.currently.precipProbability ? m('div.precip', `${forecast.currently.precipProbability}% chance of rain`) : null),
      m('div.wind', [
        m('div', `${forecast.currently.windSpeed} m/s`),
        m('div',
          `${forecast.currently.windBearing} \u00B0 `,
          m('div.arrow', {style: `transform:rotate(${forecast.currently.windBearing - 90}deg)`}, '\u27a4')
        )
      ])
    ]),
    m('div.columns.hourly', R.map(
      formatHourlyColumn,
      R.take(12, forecast.hourly.data)
    ))
  ]
) : null);

export default weatherView;
