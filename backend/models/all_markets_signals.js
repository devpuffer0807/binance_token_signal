var mongoose = require("mongoose");

const all_markets_signalSchema = new mongoose.Schema({
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

module.exports = mongoose.model("All_markets_signal", all_markets_signalSchema);