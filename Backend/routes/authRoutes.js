const express = require("express");

const router = express.Router();

const {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
  handleSignUpUserViaGoogleAuth,
} = require("../controllers/authController.js");

const {checkForAuthentication} = require("../middlewares/Authentication.js");

const passport = require("passport");

require("../Config/passport.js")(passport);

router.post("/signup", handleUserSignUp);

router.post("/login", handleUserLogin);

router.get("/logout", checkForAuthentication("token"), handleUserLogout);

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback after Google authentication
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  handleSignUpUserViaGoogleAuth
);

module.exports = router;
