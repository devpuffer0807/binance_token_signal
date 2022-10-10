var mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
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
  curDayClose: {
    type: String,
  },
  closeTradeQuantity: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
