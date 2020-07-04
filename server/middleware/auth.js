const jwt = require("jsonwebtoken");
const config = require("config");

// takes in three things
module.exports = function (req, res, next) {
  // Get token from header
  // this helps protect protected routes
  const token = req.header("x-auth-token");

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied!" });
  }

  // make sure the token is correct
  try {
    // takes token and secret
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    // catch if token is not valid
    res.status(401).json({ msg: "Token is not valid" });
  }
};
