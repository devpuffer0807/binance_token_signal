var mongoose = require("mongoose");
const User = require("./users");

const membershipSchema = new mongoose.Schema({
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
  user: {
    type: Object
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

module.exports = mongoose.model("Membership", membershipSchema);
