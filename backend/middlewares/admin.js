
module.exports = function(req, res, next) {
  const user = req.user;
  if(user.role != 'ADMIN') {
    return res.status(402).json({ status: false, message: "Please assign to ADMIN." });
  }
  else {
    next();
  }
}