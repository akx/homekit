import m from 'mithril';

const kmarketView = (data) => m(
  'section.kmarket',
  [
    m('div.title', `K-Market ${data.kmarket.name}`),
    m('div.columns', [
      m('div.open.today', [
        m('label', 'Open Today'),
        m('span', data.kmarket.todayOpen)
      ]),
      m('div.open.tomorrow', [
        m('label', 'Open Tomorrow'),
        m('span', data.kmarket.tomorrowOpen)
      ])
    ])
    /*
    m("div.columns",
      m("div.offers",
        R.map((o) => m("div",
          `${o.title} ${o.price.euros}.${o.price.cents}€${o.price.unit ? '/' + o.price.unit : ''}`
        ), data.kmarket.offerTeasers),
      )
    )
    */
  ]
);

export default kmarketView;
