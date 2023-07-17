const express = require("express");
const {
  getAllUserForAdmin,
  deleteUser,
  updateUser,
  createUser,
} = require("../controllers/adminController");

// Controller Functions

const router = express.Router();

// Get all users
router.get("/users", getAllUserForAdmin);

// Delete one user
router.delete("/user/:id", deleteUser);

// Update user details
router.patch("/user/:id", updateUser);

// Create a new user
router.post("/user", createUser);

module.exports = router;
