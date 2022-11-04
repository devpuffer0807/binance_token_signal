module.exports = function(req, res, next) {
    const user = req.user;
    if(new Date(user.expireDate).getTime() <= new Date().getTime()) {
      return res.status(402).json({ status: false, message: "Membership expired." });
    }
    else {
      next();
    }
  }