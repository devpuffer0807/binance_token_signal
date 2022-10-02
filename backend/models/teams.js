var mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    max: 255,
    min: 3,
  },
  members: [
    { type :  {
      label: {
        type:String
      }, 
      value: {
        type: mongoose.Schema.Types.ObjectId
      }
    }}
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Team", teamSchema);
