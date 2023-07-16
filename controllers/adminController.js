const mongoose = require("mongoose");
const User = require("../models/userModel");

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

  const response = await User.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!response) {
    return res.status(400).json({ error: "No Such User" });
  }

  res.status(200).json(response);
};

module.exports = {
  getAllUserForAdmin,
  deleteUser,
  updateUser,
};
