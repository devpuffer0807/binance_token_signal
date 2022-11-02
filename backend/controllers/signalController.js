const All_spot_signal = require("../models/all_spot_signals")


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
  users: async (req, res) => {
    try {
      
      const allSpots = await All_spot_signal.find({}).sort({signal_time: -1});
      let sendData = [];

      allSpots.map((signal) => {
        sendData.push({
          Signal_Time : formatDate(signal.signal_time),
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
      res.json({status: true, message: "Update Failed!"});
    }
  }
}