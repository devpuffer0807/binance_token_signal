var User = require("../models/users");
// var Membership = require("../models/memberships");
var Proposal = require("../models/proposals");
var md5 = require("md5");
const MEMBERSHIP_PLAN = 
  {
    TRYAL: {
      TITLE: "3 days Subscription",
      CONTENT: "Tryal subscription",
      STYLE: "info",
      PRICE: 0,
      PERIOD: 5,
      PERIOD_UNIT: "day"
    },
    BASIC:{
      TITLE: "1 Month Subscription",
      CONTENT: "Buy 30 Days Subscription Steps 30 Days Subscription Fee: 71.00 USDT",
      STYLE: "info",
      PRICE: 71,
      PERIOD_UNIT: "month"
    },
    PLUS:{
      TITLE: "3 Month Subscription",
      CONTENT: "Buy 90 Days Subscription Steps 90 Days Subscription Fee: 176.00 USDT",
      STYLE: "danger",
      PRICE: 176,
      PERIOD_UNIT: "month"
    },
  };
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
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
      const proposal = new Proposal ({
        plan: requestData.plan,
        transferCode: requestData.transferCode,
        userId: user.id
      });
      await Proposal.create(proposal);
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
  proposals: async (req, res) => {
    try {
      const query = [{
        $match: {
          state: true
        }
      },
      {
        $project: {
          _id: 1,
          plan: 1,
          transferCode: 1,
          userId: 1
        }
      }, {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          pipeline: [{
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              userEmail: 1,
              nickName: 1
            }
          }],
          as: 'user'
        }
      }];
      const proposalValues = await Proposal.aggregate(query);
      var newProposals = [];
      proposalValues.map((proposal) => {
        newProposals.push({
          _id: proposal._id,
          plan: proposal.plan,
          transferCode: proposal.transferCode,
          userId: proposal.userId,
          firstName: proposal.user[0].firstName,
          lastName: proposal.user[0].lastName,
          userEmail: proposal.user[0].userEmail,
          nickName: proposal.user[0].nickName
        });
      })
      res.json({status: true, message: "loaded", proposals: newProposals})
    }
    catch {
      res.json({status: false, message: "Can't read subscriptions!"});
    }
  },
  updateuserplan: async (req, res) => {
    try {
      const {
        id, 
        plan,
        period,
        mode
      } = req.body;
      if(!id) {
        res.json({status: false, message: "Id validation error."});
      }
      let userId, proposal;
      if(mode == false) {
        userId = id;
      }
      else {
        proposal = await Proposal.findOne({_id : id});
        userId = proposal.userId;
      }
      
      const user = await User.findOne({_id : userId});
      if(!user) {
        return res.json({ status: false, message: "User don't exist!" });
      }
      
      let date = new Date();
      
      if(MEMBERSHIP_PLAN[plan].PERIOD_UNIT == "month") {
        date = new Date(date.setMonth(date.getMonth() + Number(period)));
      }
      else {
        date = new Date(date.setDate(date.getDate() + Number(period)));
      }
      let update = user;
      update.membershipPlan = plan;
      update.expireDate = date;
      await user.updateOne(update);
      if(mode) {
        let upProposal = proposal;
        upProposal.state = false;
        await proposal.updateOne(upProposal);
      }
      res.json({status: true, message: "Successful update!"});
    }
    catch { 
      res.json({status: false, message: "Can't update usermembership!"});
    }
  }
}