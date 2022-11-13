export const PRODUCTION = (window.location.host.includes("localhost") || window.location.host.includes("127.0.0.1")) ? false : true;


export const SERVER_URL_PRODUCTION = "https://clownfish-app-bffg4.ondigitalocean.app";
export const SERVER_URL_TEST = "http://localhost:5000";
export const SERVER_URL = PRODUCTION ? SERVER_URL_PRODUCTION : SERVER_URL_TEST;
export const MEMBERSHIP_PLAN = 
  {
    TRYAL: {
      TITLE: "3 days Subscription",
      CONTENT: "Tryal subscription",
      STYLE: "info",
      PRICE: 0,
      PERIOD: 5,
      PERIOD_UNIT: "day"
    },
    BASIC:{
      TITLE: "1 Month Subscription",
      CONTENT: "Buy 30 Days Subscription Steps 30 Days Subscription Fee: 51.00 USDT",
      STYLE: "info",
      PRICE: 51,
      PERIOD_UNIT: "month"
    },
    PLUS:{
      TITLE: "3 Month Subscription",
      CONTENT: "Buy 90 Days Subscription Steps 90 Days Subscription Fee: 126.00 USDT",
      STYLE: "danger",
      PRICE: 126,
      PERIOD_UNIT: "month"
    },
  };
export const SIGNAL_DATA = {
  GETALL: {
    TITLE: "All Spot Signals",
    VALUE: 0,
    LINK: '/signals/all-spot-signals'
  },
  BTC: {
    TITLE: "BTC Spot Signals",
    VALUE: 1,
    LINK: '/signals/btc-spot-signals'
  },
  USDT: {
    TITLE: "USDT Spot Signals", 
    VALUE: 2,
    LINK: '/signals/usdt-spot-signals'
  },
  BUSDT: {
    TITLE: "BUSD Spot Signals",
    VALUE: 3,
    LINK: '/signals/busd-spot-signals'
  },
  ALL_USDT: {
    TITLE: "All Markets Signals",
    VALUE: 4,
    LINK: '/signals/all-markets-signals'
  },
  KUCOIN_USDT: {
    TITLE: "Kucoin Signals",
    VALUE: 5,
    LINK: '/signals/all-kucoin-signals'
  },
  BITFIX_USDT: {
    TITLE: "Bitfinex Signals",
    VALUE: 6,
    LINK: '/signals/bitfinex-signals'
  },
  FIX_SIGNAL: {
    TITLE: "FTX Signals",
    VALUE: 7,
    LINK: '/signals/fix-signals'
  },
  BINANCE_FUTURE: {
    TITLE: "Binance Futures",
    VALUE: 8,
    LINK: '/signals/binance-futures'
  }
}