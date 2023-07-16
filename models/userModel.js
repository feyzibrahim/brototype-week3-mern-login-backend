const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Static Signup Method

userSchema.statics.signup = async function (email, password, userName) {
  // Email Validation
  if (!email || !password) {
    throw Error("All Fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // Checking for duplicate emails
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  //   Adding Salt
  const salt = await bcrypt.genSalt(10);
  //   Hashing the password
  const hash = await bcrypt.hash(password, salt);

  const type = "user";

  //   Creating the user in DB
  const user = await this.create({
    email,
    password: hash,
    userName,
    userType: type,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("This email is not registered. Please check!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
