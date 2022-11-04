const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  // Check if no token
  if (!token) {
    return res.status(401).json({ status: false, message: "No token, authorization denied. Please login again" });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if(error) {
        return res.status(401).json({ status: false, message: "Token is not valid. Please login again" });
      }
      else {
        if(decoded.tokenExpire <= new Date().getTime()) {
          return res.status(401).json({ status: false, message: "Token is expired. Please login again" });
        }
        req.user = decoded.user;
        next();
      }
    })
  }
  catch (err) {
    console.error('something wrong with auth middleware');
    return res.status(500).json({ status: false, message: "Server error in common middleware." });
  }
}