var User = require("../models/users");
var md5 = require("md5");

module.exports = {
    update: async (req, res) => {
        try {
            const user = await User.findOne({userEmail : req.body.userEmail});
            // console.log(req.body)
            const update = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nickName: req.body.nickName,
                userEmail: req.body.userEmail,
                userPassword: md5(req.body.userPassword),
                photo: req.body.photo,
            }
    
            await user.updateOne(update);

            res.json({status: true, message: "Update Successful!"});
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