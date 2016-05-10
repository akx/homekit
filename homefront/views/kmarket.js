import m from 'mithril';

const kmarketView = (kmarket) => (kmarket ? m(
  'section.kmarket',
  [
    m('div.title', `K-Market ${kmarket.name}`),
    m('div.columns', [
      m('div.open.today', [
        m('label', 'Open Today'),
        m('span', kmarket.todayOpen),
      ]),
      m('div.open.tomorrow', [
        m('label', 'Open Tomorrow'),
        m('span', kmarket.tomorrowOpen),
      ]),
    ]),
    /*
    m("div.columns",
      m("div.offers",
        R.map((o) => m("div",
          `${o.title} ${o.price.euros}.${o.price.cents}€${o.price.unit ? '/' + o.price.unit : ''}`
        ), kmarket.offerTeasers),
      )
    )
    */
  ]
) : null);

export default kmarketView;
