const user = require("../models/user");
const {createTokenForUser} = require("../Services/Authentication")
async function handleUserSignUp(req, res) {
  console.log("Request to sign up received!!");

  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    console.log({
      msg: "failed",
      error: "Field missing or incorrect in signup form.",
    });

    return res
      .status(400)
      .json({
        msg: "failed",
        error: "Field missing or incorrect in signup form.",
      });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "failed", error: "Email already registered." });
    }

    // Create new User
    const created = await user.create({
      name,
      email,
      password,
    });

    if (!created) {
      console.log({ msg: "failed", error: "Error while creating user." });
      return res
        .status(500)
        .json({ msg: "failed", error: "Error while creating user." });
    }
    console.log(created);

    console.log("User signed up successfully!!");
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ msg: "failed", error: "Server error." });
  }
}

async function handleUserLogout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    console.log("User logged out successfully");

    return res.status(200).json({ msg: "success" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ msg: "failed", error: "Server error." });
  }
}

const handleUserLogin = async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Invalid fields Entered!!!" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ msg: "Invalid fields Entered!!!" });
  }

  const User = await user.matchedUserAndGenerateToken(email, password);
  console.log(User);

  if (User.error) {
    return res.status(500).json({ error: "Sign In failed!!" });
  }

  console.log("Token of user: ", User.token);
  const token = User.token;
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ msg: "Sign In succedded", user: User });
};


async function handleSignUpUserViaGoogleAuth(req, res) {
  try {
    const user = req.user; // Comes from Passport Google OAuth strategy

    if (!user) {
      return res.redirect("http://localhost:5173/login?error=oauth_failed");
    }

    const token = createTokenForUser(user);

    // Set the token as an httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // Redirect to frontend dashboard or callback page
    return res.redirect("http://localhost:5173/dashboard");
  } catch (err) {
    console.error("OAuth signup error:", err);
    return res.redirect("http://localhost:5173/login?error=oauth_failed");
  }
}


module.exports = {
  handleUserSignUp,
  handleUserLogout,
  handleUserLogin,
  handleSignUpUserViaGoogleAuth
};
