/* eslint-disable import/no-unresolved */
require('!style!css!stylus!./style.styl');
import m from 'mithril';
import {reload} from './data';

const remount = () => {
  const {view} = require('./view.js');  // eslint-disable-line global-require
  m.mount(document.body, {view});
};

if (module.hot) {
  module.hot.accept('./view.js', () => {
    remount();
  });
}

remount();
reload();

setInterval(() => {
  m.redraw(true);
}, 15000);

setInterval(() => {
  reload();
}, 60000);

setInterval(() => {
  location.reload();
}, 8640 * 1000);
