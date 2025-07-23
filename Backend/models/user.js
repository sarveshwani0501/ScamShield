const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../Services/Authentication.js");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    salt: { type: String },
    googleId: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.googleId) return next();
  const salt = randomBytes(16).toString();
  this.salt = salt;
  this.password = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");
  next();
});

userSchema.static(
  "matchedUserAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return { error: "User not found or OAuth user" };

    if (user.googleId) {
      const token = createTokenForUser(user);
      return { token, msg: "Sign In Succeeded" };
    }

    const userProvidedHash = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");
    if (userProvidedHash !== user.password)
      return { error: "Invalid password" };

    const token = createTokenForUser(user);
    return { token, msg: "Sign In Succeeded" };
  }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
