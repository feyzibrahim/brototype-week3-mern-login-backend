const mongoose = require("mongoose");
const User = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");

// Get all users for admin
const getAllUserForAdmin = async (req, res) => {
  const users = await User.find({}).sort({ userName: 1 });

  res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID!!!" });
  }

  const response = await User.findOneAndDelete({ _id: id });

  if (!response) {
    return res.status(400).json({ error: "No Such User" });
  }

  res.status(200).json(response);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID!!!" });
  }

  const profilePhotoPath = req?.file?.path;
  let dpPath = "";
  if (profilePhotoPath) {
    dpPath = profilePhotoPath;
  }

  let data = { ...req.body };
  if (dpPath !== "") {
    data = { ...req.body, dpPath };
  }

  const response = await User.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  if (!response) {
    return res.status(400).json({ error: "No Such User" });
  }

  res.status(200).json(response);
};

const newUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, passwordA, userName, userType } = req.body;

    if (userName.trim() === "") {
      throw Error("All Fields must be filled");
    }

    if (!email || !password || !userType || !passwordA || !userName) {
      throw Error("All Fields must be filled");
    }

    if (password !== passwordA) {
      throw Error("Password doesn't match");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough");
    }

    // Checking for duplicate emails
    const exists = await User.findOne({ email });

    if (exists) {
      throw Error("Email already in use");
    }

    //   Adding Salt
    const salt = await bcrypt.genSalt(10);
    //   Hashing the password
    const hash = await bcrypt.hash(password, salt);

    // Getting the Profile Image
    const profilePhotoPath = req?.file?.path;
    let dpPath = "";
    if (profilePhotoPath) {
      dpPath = profilePhotoPath;
    }

    //   Creating the user in DB
    const user = await User.create({
      email,
      password: hash,
      userName,
      userType,
      dpPath,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUserForAdmin,
  deleteUser,
  updateUser,
  newUser,
};
