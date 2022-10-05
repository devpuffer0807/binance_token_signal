var User = require("../models/users");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
var md5 = require("md5");

var errorMessage = require("../locale/en");
var errorCode = require("../constants/errorCode");

module.exports = {
  register: async (req, res) => {
    const emailExist = await User.findOne({ userEmail: req.body.userEmail });
    if (emailExist)
      return res.json({ status: false, message: "Email already exist!" });

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
    } catch (error) {
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
      const userinfo = await User.findOne({ userEmail: user.userEmail });
      if (!userinfo)
        return res.json({
          status: false,
          message: "Please check your login information!",
        });

      if (userinfo.userPassword == user.userPassword) {
        res.json({
          status: true,
          message: "Login Successful!",
          data: userinfo,
        });
      } else {
        res.json({
          status: false,
          message: "Please check your login information!",
        });
      }
    } catch (error) {
      res.json({ status: false, message: "Login Failed!" });
    }
  },
  /**
   * @param req.body.email
   *
   * @return { status: true }
   *
   * @return { status: false, message: errorMessage.unregisterEmail}
   * @return { status: false, errorCode: errorCode.smtpEmailError, message: error.message}
   * @return { status: false, message: errorMessage.unexpectedError }
   *
   **/
  forgot: async (req, res) => {
    const userEmail = req.body.email;
    try {
      const user = await User.findOne({ userEmail: userEmail });
      if (!user)
        return res.json({
          status: false,
          message: errorMessage.unregisterEmail,
        });

      user.verifyCode = crypto
        .randomBytes(5)
        .toString("base64")
        .substring(0, 5)
        .toUpperCase();
      await user.save();

      const transporter = nodemailer.createTransport({
        port: process.env.MAIL_PORT,
        host: process.env.MAIL_SERVER,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
        secure: true,
      });
      const mailData = {
        from: "support@whalealerts.com",
        to: userEmail,
        subject: "Whales Alert Verification Code",
        text: "Easy",
        html: `
          <div
            style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2b266d;"
          >
            <h1>Welcome to Whales Alert</h1>
            <span style="color: black">
              Thanks for using our service.
            </span>
          
            <p style="color: black">
              Here is your verification code.
            </p>
            <h3 style="padding: 24px; background-color: #ddd; font-size: 48px;">${user.verifyCode}</h3>
          
            <p style="color: black">
              Regards.
            </p>
          </div>
        `,
      };

      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          return res.json({
            status: false,
            errorCode: errorCode.smtpEmailError,
            message: error.message,
          });
        }

        res.json({
          status: true,
        });
      });
    } catch (error) {
      res.json({
        status: false,
        errorCode: errorCode.unexpectedError,
        message: errorMessage.unexpectedError,
      });
    }
  },
  /**
   * @param email
   * @param verifyCode
   * @param password
   * @return { status: true }
   * @return { status: false, message: errorMessage.verificationCodeError }
   * @return { status: false, message: errorMessage.emailError }
   * @return { status: false, errorCode: errorCode.unexpectedError, message: errorMessage.unexpectedError }
   **/
  reset: async (req, res) => {
    try {
      const { email, verifyCode, password } = req.body;
      var user = await User.findOne({
        userEmail: email,
      });

      if (user) {
        if (user.verifyCode === verifyCode) {
          user.verifyCode = "";
          user.userPassword = md5(password);
          user.updatedAt = new Date();
          await user.save();
          return res.json({
            status: true,
          });
        } else {
          return res.json({
            status: false,
            message: errorMessage.verificationCodeError,
          });
        }
      }

      return res.json({
        status: false,
        message: errorMessage.emailError,
      });
    } catch (e) {
      return res.json({
        status: false,
        errorCode: errorCode.unexpectedError,
        message: errorMessage.unexpectedError,
      });
    }
  },
};
