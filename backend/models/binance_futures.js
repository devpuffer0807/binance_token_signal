var mongoose = require("mongoose");

const binance_futureSchema = new mongoose.Schema({
  signal_time : {
    type: Date,
  },
  count : {
    type: Number
  },
  symbol : {
    type: String,
  },
  last_price: {
    type: Number
  },
  percent: {
    type: Number
  },
  '24h_change': {
    type: Number
  },
  total: {
    type: Number
  },
  series : {
    type: String,
  },
  signal: {
    type: String,
  },
  success: {
    type: Number,
  },
  arrow: {
    type: Number
  }
});

module.exports = mongoose.model("Binance_future", binance_futureSchema);