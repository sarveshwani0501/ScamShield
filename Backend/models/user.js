const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  const password = user.password;

  // hashing password using bcrypt
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassowrd = await bcrypt.hash(password, salt);

    this.password = hashedPassowrd;
    next();
  } catch (error) {
    next(error);
  }
});




const User = mongoose.model("User", userSchema);

module.exports = User;
