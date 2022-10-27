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
      CONTENT: "Buy 30 Days Subscription Steps 30 Days Subscription Fee: 71.00 USDT",
      STYLE: "info",
      PRICE: 71,
      PERIOD_UNIT: "month"
    },
    PLUS:{
      TITLE: "3 Month Subscription",
      CONTENT: "Buy 90 Days Subscription Steps 90 Days Subscription Fee: 176.00 USDT",
      STYLE: "danger",
      PRICE: 176,
      PERIOD_UNIT: "month"
    },
  };
