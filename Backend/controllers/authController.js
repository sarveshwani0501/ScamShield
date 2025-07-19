const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const uploadToCloudinary = require("../utils/cloudinary");

function generateToken(user) {
  const payload = {
    name: user.name,
    id: user._id,
    email: user.email,
    //profilePic: user.profilePic,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
}

async function signUp(req, res) {
  try {
    const body = req.body;
    const { name, email, password } = body;

    const findUserName = await User.findOne({ name });
    if (findUserName) {
      return res.status(400).json({ message: "Username already exits" });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ message: "Email Id already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res
      .status(201)
      .json({ message: "User data added successfully", user: user });
  } catch (error) {
    console.log("Sign Up error: ", error);
    return res.status(500).json({ message: error.message });
  }
}

const ONE_DAY = 24 * 60 * 60 * 1000;

async function login(req, res) {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });
  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const token = generateToken(user);
  console.log("Cookie in token ", token);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: ONE_DAY,
  });

  return res.status(200).json({
    message: "User login successful",
    user: user,
    token,
  });
}

async function logout(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "User log out successful" });
}

async function getUserDetails(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ error: "User Details not found" });
    }
    user.password = "";
    return res.status(200).json({ msg: "Profile Information provided", user });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
}




module.exports = {
  signUp,
  login,
  logout,
  getUserDetails,
};
