var mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  plan: {
    type: String,
    require: true,
    max: 255,
    min: 3,
  },
  transferCode: {
    type: String,
    require: true,
    max: 255,
    min: 3,
  },
  userId: {
    type: mongoose.Types.ObjectId
  },
  state: {
    type: Boolean,
    require: true,
    default: true,
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

module.exports = mongoose.model("Proposal", proposalSchema);
