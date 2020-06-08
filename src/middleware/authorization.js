const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: "Unauthorized! You must be logged in for that",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
  },

  // isAdmin: (req, res) => {

  // }
};
