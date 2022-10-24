var User = require("../models/users");
var Membership = require("../models/memberships");
var md5 = require("md5");

module.exports = {
  saveproposal: async (req, res) => {
    try {
      const requestData = req.body;
      if(!requestData.user){
          res.json({status: false, message: "Invalid user."});
      }

      const user = await User.findOne({userEmail : requestData.user.userEmail});
      
      if(!user) {
          res.json({status: false, message: "can't find user."});
      }
      if(!requestData.transferCode) {
          res.json({status: false, message: "error transferCode."});
      }
      const membership = new Membership ({
          plan: requestData.plan,
          transferCode: requestData.transferCode,
          userId: user.id
      });
      await Membership.create(membership);
      res.json({ status: true, message: "Proposal Successful!" });
    }
    catch {
      res.json({status: true, message: "Update Failed!"});
    }
  },
  memberships: async (req, res) => {
    try {

    }
    catch {
      res.json({status: true, message: "Can't read memberships!"});
    }
  },
  subscription: async (req, res) => {
    try {
      
    }
    catch {
      res.json({status: true, message: "Can't read subscriptions!"});
    }
  }
}