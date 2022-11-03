const All_spot_signal = require("../models/all_spot_signals");
const All_markets_signal = require("../models/all_markets_signals");
const Kucoin_signal = require("../models/kucoin_signals");
const Bitfinex_signal = require("../models/bitfinex_signals");
const Ftx_signal = require("../models/ftx_signals");
const Binance_future = require("../models/binance_futures");

const limitTimeRange = 60 * 30;   // minutes
const intervalTime = 60 * 1000 * 10  //milisecond
// const intervalTime = 2000  //milisecond

function formatDate(date) {
  var d = new Date(date),
    year = '' + d.getFullYear(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    hour = '' + d.getHours(),
    minute = '' + d.getMinutes(),
    second = '' + d.getSeconds()

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;
  if(hour.length < 2)
    hour = '0' + hour;
  if(minute.length < 2)
    minute = '0' + minute;
  if(second.length < 2)
    second = '0' + second;
  return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
}

async function clearAllSpot() {
  const lastSpot = await All_spot_signal.find({}).sort({signal_time : -1}).limit(1);
  let lastLimitTime = new Date(new Date(lastSpot[0].signal_time).getTime() + limitTimeRange * 60000 * (-1));
  let formatedLastTime = formatDate( lastLimitTime);
  // let agree = [{
  //   $match: {
  //     signal_time: {
  //       $lt: formatedLastTime
  //     }
  //   }
  // }];
  const deleteSpot = await All_spot_signal.deleteMany({signal_time : {$lt : formatedLastTime}})
  console.log("all_spot_signals", deleteSpot);
}

async function clearAllMarket() {
  const lastSpot = await All_markets_signal.find({}).sort({signal_time : -1}).limit(1);
  let lastLimitTime = new Date(new Date(lastSpot[0].signal_time).getTime() + limitTimeRange * 60000 * (-1));
  let formatedLastTime = formatDate( lastLimitTime);
  const deleteSpot = await All_markets_signal.deleteMany({signal_time : {$lt : formatedLastTime}})
  console.log("All_markets_signal", deleteSpot);
}

async function clearBinanceFuture() {
  const lastSpot = await Binance_future.find({}).sort({signal_time : -1}).limit(1);
  let lastLimitTime = new Date(new Date(lastSpot[0].signal_time).getTime() + limitTimeRange * 60000 * (-1));
  let formatedLastTime = formatDate( lastLimitTime);
  const deleteSpot = await Binance_future.deleteMany({signal_time : {$lt : formatedLastTime}})
  console.log("Binance_future", deleteSpot);
}

async function clearBitfinex() {
  const lastSpot = await Bitfinex_signal.find({}).sort({signal_time : -1}).limit(1);
  let lastLimitTime = new Date(new Date(lastSpot[0].signal_time).getTime() + limitTimeRange * 60000 * (-1));
  let formatedLastTime = formatDate( lastLimitTime);
  const deleteSpot = await Bitfinex_signal.deleteMany({signal_time : {$lt : formatedLastTime}})
  console.log("Bitfinex_signal", deleteSpot);
}

async function clearFtx() {
  const lastSpot = await Ftx_signal.find({}).sort({signal_time : -1}).limit(1);
  let lastLimitTime = new Date(new Date(lastSpot[0].signal_time).getTime() + limitTimeRange * 60000 * (-1));
  let formatedLastTime = formatDate( lastLimitTime);
  const deleteSpot = await Ftx_signal.deleteMany({signal_time : {$lt : formatedLastTime}})
  console.log("Ftx_signal", deleteSpot);
}

async function clearKucoin() {
  const lastSpot = await Kucoin_signal.find({}).sort({signal_time : -1}).limit(1);
  let lastLimitTime = new Date(new Date(lastSpot[0].signal_time).getTime() + limitTimeRange * 60000 * (-1));
  let formatedLastTime = formatDate( lastLimitTime);
  const deleteSpot = await Kucoin_signal.deleteMany({signal_time : {$lt : formatedLastTime}})
  console.log("Kucoin_signal", deleteSpot);
}

function dbclear() {
  setInterval(async () => {
    await clearAllSpot();
    await clearAllMarket();
    await clearBinanceFuture();
    await clearBitfinex();
    await clearFtx();
    await clearKucoin();
  }, intervalTime);
}

module.exports = dbclear;