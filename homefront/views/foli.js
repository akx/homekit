import m from 'mithril';
import R from 'ramda';
import moment from 'moment';

const formatFoliEntry = (res) => {
  const edt = moment.unix(res.expecteddeparturetime);
  const msecToDeparture = edt.diff(moment());
  if (msecToDeparture < 0) return;
  const soon = Math.abs(msecToDeparture) < 60 * 5 * 1000;
  return m('div.i' + (soon ? '.soon' : ''), [
    m('div.line', res.lineref),
    m('div.dest', res.destinationdisplay),
    m('div.eta', [
      m('div.abs', edt.format('HH:mm')),
      (msecToDeparture < 30 * 60 * 1000 ? m('div.rel', edt.fromNow()) : null)
    ])
  ]);
};

const foliView = (data) => m('section.foli', [
  m('div.title', 'Föli'),
  m('div.columns',
    R.map(formatFoliEntry, data.foli.result)
  )
]);

export default foliView;
