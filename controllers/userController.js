const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Create JST Tokens
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "1d",
  });
};

// Login Function
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    const _id = user._id;
    const userName = user.userName;
    const userType = user.userType;
    const dpPath = user.dpPath;

    res.status(200).json({ _id, email, token, userName, userType, dpPath });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   res.status(200).json({ msg: "Login User" }); <-- just testing for first time
};

// Signup function
const signupUser = async (req, res) => {
  const profilePhotoPath = req?.file?.path;

  const { email, password, userName } = req.body;

  try {
    const user = await User.signup(email, password, userName, profilePhotoPath);

    const token = createToken();

    const userType = user.userType;
    const dpPath = user.dpPath;
    const _id = user._id;

    res.status(200).json({ _id, email, token, userName, userType, dpPath });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

module.exports = {
  loginUser,
  signupUser,
  updateUser,
};
