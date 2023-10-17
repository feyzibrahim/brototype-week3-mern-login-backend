const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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

    const userName = user.userName;
    const userType = user.userType;

    res.status(200).json({ email, token, userName, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   res.status(200).json({ msg: "Login User" }); <-- just testing for first time
};

// Signup function
const signupUser = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const user = await User.signup(email, password, userName);

    const token = createToken(user._id);

    const userType = user.userType;

    res.status(200).json({ email, token, userName, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   res.status(200).json({ msg: "Signup User" }); <-- just testing for first time
};

module.exports = {
  loginUser,
  signupUser,
};
