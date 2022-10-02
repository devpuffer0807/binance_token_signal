var User = require("../models/users");
var md5 = require("md5");

module.exports = {
  register: async (req, res) => {

    const emailExist = await User.findOne({userEmail : req.body.userEmail});
    if(emailExist) return res.json({ status : false, message: "Email already exist!"});

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nickName: "",
      photo: "",
      userEmail: req.body.userEmail,
      userPassword: md5(req.body.userPassword),
      role: req.body.role,
    });

    try {
      await User.create(user);
      res.json({ status: true, message: "Register Successful!" });
    } 
    catch (error) {
      res.json({ status: false, message: "Register Failed!" });
    }
  },
  login: async (req, res) => {
    const user = new User({
      userEmail: req.body.userEmail,
      userPassword: md5(req.body.userPassword),
      role: "USER",
    });

    try {
      const userinfo = await User.findOne({userEmail: user.userEmail});
      if (!userinfo) return res.json({ status: false, message: "Please check your login information!" });

      if (userinfo.userPassword == user.userPassword) {
        res.json({ status: true, message: "Login Successful!", data: userinfo });
      }
      else {
        res.json({ status: false, message: "Please check your login information!" });
      }
    } 
    catch (error) {
      res.json({ status: false, message: "Login Failed!" });
    }
  },
};
