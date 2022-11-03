const All_spot_signal = require("../models/all_spot_signals");
const All_markets_signal = require("../models/all_markets_signals");
const Kucoin_signal = require("../models/kucoin_signals");
const Bitfinex_signal = require("../models/bitfinex_signals");
const Ftx_signal = require("../models/ftx_signals");
const Binance_future = require("../models/binance_futures");

function formatDate(date) {
  var d = new Date(date),
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
  return month + '/' + day + '-' + hour + ':' + minute + ':' + second;
}

module.exports = {
  spot : async (req, res) => {
    try {
      var condition = {};
      const actionType = req.body.type;
      console.log(actionType)
      if(actionType != 'GETALL') {
        condition = {
          symbol : {
            $regex: actionType + '$'
          }
        };
      }
      const allSpots = await All_spot_signal.find(condition).sort({signal_time: -1});
      let sendData = [];
      allSpots.map((signal) => {
        sendData.push({
          Signal_Time : formatDate(new Date(new Date(signal.signal_time).getTime() + 180 * 60000)),
          Count: signal.count,
          Symbol: signal.symbol,
          Last_Price: signal.last_price,
          Percent: Math.round(signal.percent * 10000) / 10000,
          '24h_change' : Math.round(signal['24h_change'] * 10000) / 10000,
          Total: Math.round(signal.total * 10000) / 10000,
          Series: signal.series
        });
      });
      res.json({status: true, message: "true", data: sendData});
    }
    catch {
      res.json({status: false, message: "Failed!"});
    }
  },
  market : async(req, res) => {
    try {
      const allSpots = await All_markets_signal.find({}).sort({signal_time: -1});
      let sendData = [];
      allSpots.map((signal) => {
        sendData.push({
          Signal_Time : formatDate(new Date(new Date(signal.signal_time).getTime() + 180 * 60000)),
          Count: signal.count,
          Symbol: signal.symbol,
          Last_Price: signal.last_price,
          Percent: Math.round(signal.percent * 10000) / 10000,
          '24h_change' : Math.round(signal['24h_change'] * 10000) / 10000,
          Total: Math.round(signal.total * 10000) / 10000,
          Series: signal.series
        });
      });
      res.json({status: true, message: "true", data: sendData});
    }
    catch {
      res.json({status: false, message: "Failed!"});
    }
  },
  kucoin : async(req, res) => {
    try {
      const allSpots = await Kucoin_signal.find({}).sort({signal_time: -1});
      let sendData = [];
      allSpots.map((signal) => {
        sendData.push({
          Signal_Time : formatDate(new Date(new Date(signal.signal_time).getTime() + 180 * 60000)),
          Count: signal.count,
          Symbol: signal.symbol,
          Last_Price: signal.last_price,
          Percent: Math.round(signal.percent * 10000) / 10000,
          '24h_change' : Math.round(signal['24h_change'] * 10000) / 10000,
          Total: Math.round(signal.total * 10000) / 10000,
          Series: signal.series
        });
      });
      res.json({status: true, message: "true", data: sendData});
    }
    catch {
      res.json({status: false, message: "Failed!"});
    }
  },
  bitfinex : async(req, res) => {
    try {
      const allSpots = await Bitfinex_signal.find({}).sort({signal_time: -1});
      let sendData = [];
      allSpots.map((signal) => {
        sendData.push({
          Signal_Time : formatDate(new Date(new Date(signal.signal_time).getTime() + 180 * 60000)),
          Count: signal.count,
          Symbol: signal.symbol,
          Last_Price: signal.last_price,
          Percent: Math.round(signal.percent * 10000) / 10000,
          '24h_change' : Math.round(signal['24h_change'] * 10000) / 10000,
          Total: Math.round(signal.total * 10000) / 10000,
          Series: signal.series
        });
      });
      res.json({status: true, message: "true", data: sendData});
    }
    catch {
      res.json({status: false, message: "Failed!"});
    }
  },
  ftx : async(req, res) => {
    try {
      const allSpots = await Ftx_signal.find({}).sort({signal_time: -1});
      let sendData = [];
      allSpots.map((signal) => {
        sendData.push({
          Signal_Time : formatDate(new Date(new Date(signal.signal_time).getTime() + 180 * 60000)),
          Count: signal.count,
          Symbol: signal.symbol,
          Last_Price: signal.last_price,
          Percent: Math.round(signal.percent * 10000) / 10000,
          '24h_change' : Math.round(signal['24h_change'] * 10000) / 10000,
          Total: Math.round(signal.total * 10000) / 10000,
          Series: signal.series
        });
      });
      res.json({status: true, message: "true", data: sendData});
    }
    catch {
      res.json({status: false, message: "Failed!"});
    }
  },
  future : async(req, res) => {
    try {
      const allSpots = await Binance_future.find({}).sort({signal_time: -1});
      let sendData = [];
      allSpots.map((signal) => {
        sendData.push({
          Signal_Time : formatDate(new Date(new Date(signal.signal_time).getTime() + 180 * 60000)),
          Count: signal.count,
          Symbol: signal.symbol,
          Last_Price: signal.last_price,
          Percent: Math.round(signal.percent * 10000) / 10000,
          '24h_change' : Math.round(signal['24h_change'] * 10000) / 10000,
          Total: Math.round(signal.total * 10000) / 10000,
          Signal: signal.signal,
          Success: signal.success
        });
      });
      res.json({status: true, message: "true", data: sendData});
    }
    catch {
      res.json({status: false, message: "Failed!"});
    }
  }
}