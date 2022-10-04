export const PRODUCTION = (window.location.host.includes("localhost") || window.location.host.includes("127.0.0.1")) ? false : true;


export const SERVER_URL_PRODUCTION = "https://clownfish-app-bffg4.ondigitalocean.app";
export const SERVER_URL_TEST = "http://localhost:5000";
export const SERVER_URL = PRODUCTION ? SERVER_URL_PRODUCTION : SERVER_URL_TEST;
