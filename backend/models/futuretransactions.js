var mongoose = require("mongoose");

const futuretransactionSchema = new mongoose.Schema({
  eventType: {
    type: String,
  },
  eventTime: {
    type: Number,
  },
  symbol: {
    type: String,
  },
  priceChange: {
    type: String,
  },
  priceChangePercent: {
    type: String,
  },
  weightedAvg: {
    type: String,
  },
  prevDayClose: {
    type: String,
  },
  curDayClose: {
    type: String,
  },
  closeTradeQuantity: {
    type: String,
  },
  bestBid: {
    type: String,
  },
  bestBidQnt: {
    type: String,
  },
  bestAsk: {
    type: String,
  },
  bestAskQnt: {
    type: String,
  },
  open: {
    type: String,
  },
  high: {
    type: String,
  },
  low: {
    type: String,
  },
  volume: {
    type: String,
  },
  volumeQuote: {
    type: String,
  },
  openTime: {
    type: Number,
  },
  closeTime: {
    type: Number,
  },
  firstTradeId: {
    type: Number,
  },
  lastTradeId: {
    type: Number,
  },
  totalTrades: {
    type: Number,
  },
  count: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FutureTransaction", futuretransactionSchema);
