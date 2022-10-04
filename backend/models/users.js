var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    max: 255,
    min: 3,
  },
  lastName: {
    type: String,
    require: true,
    max: 255,
    min: 3,
  },
  nickName: {
    type: String,
    require: false,
    max: 255,
    min: 3,
  },
  photo: {
    type: String,
    require: false,
    max: 255,
    min: 3,
  },
  userEmail: {
    type: String,
    require: true,
    max: 255,
    min: 6,
  },
  userPassword: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  verifyCode: {
    type: String,
    allowNull: true,
    defaultValue: ""
  },
  role: {
    type: String,
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

module.exports = mongoose.model("User", userSchema);
