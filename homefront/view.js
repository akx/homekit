import m from 'mithril';
import {get} from './data';
import moment from 'moment';
import foliView from './views/foli';
import weatherView from './views/weather';
import kmarketView from './views/kmarket';

const clock = () => {
  const now = moment();
  return m('div#clock', m('.inner', [
    m('div.time', now.format('HH:mm'))
  ]));
};

export const view = () => {
  const data = get();
  return m('div', [
    foliView(data),
    weatherView(data),
    kmarketView(data),
    clock()

  ]);
};

