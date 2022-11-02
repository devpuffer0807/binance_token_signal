const User = require("../models/users");
const request = require('request');
const apiUrl = 'https://scanner.tradingview.com/crypto/scan';

module.exports = {
    scan: async (req, res) => {
      try {
        const reqBody = req.body;
        request.post(
          apiUrl,
          {json: reqBody},
          function (error, response, body){
            if (!error && response.statusCode == 200) {
              const data = body['data'];
              let resData = [];
              Object.keys(data).forEach(function(key) {
                let tmpRes = {};										
                let columnCnt = 0;
                data[key]['d'].map((val) => {
                  if(reqBody.columns[columnCnt] == "Recommend.All") {
                    tmpRes["recommendall"] = val;
                  }
                  else {
                    tmpRes[reqBody.columns[columnCnt]] = val;
                  }
                  columnCnt++;
                });
                resData.push(tmpRes);
              });
              
              res.json({status: true, data: resData});
            }
          }
        );
        
      }
      catch {
        res.json({status: true, message: "Update Failed!"});
      }
    },

    users: async (req, res) => {
      try {
        const users = await User.find({});
        res.json({status: true, message: "true", users: users});
      }
      catch {
        res.json({status: true, message: "Update Failed!"});
      }
    }
}