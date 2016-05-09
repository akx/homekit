import m from 'mithril';

let data = JSON.parse(sessionStorage.HOMEKIT || '{}');

function setData(d) {
  data = d;
  sessionStorage.HOMEKIT = JSON.stringify(d);
}

export function reload() {
  fetch('http://127.0.0.1:5000/data')
    .then((r) => r.json())
    .then((d) => {
      setData(d);
      m.redraw();
    });
}

export function get() {
  return data;
}
