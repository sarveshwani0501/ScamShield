const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function verifyAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    console.log("Token in verifyAuth: ", token);
    if (!token) {
      return res.status(401).json({
        error: "Token not found",
        isAuthenticated: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({
        error: "User not found",
        isAuthenticated: false,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
      isAuthenticated: false,
    });
  }
}

module.exports = verifyAuth;
