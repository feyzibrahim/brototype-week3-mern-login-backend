const express = require("express");
const {
  getAllUserForAdmin,
  deleteUser,
  updateUser,
} = require("../controllers/adminController");

// Controller Functions

const router = express.Router();

// Get all users
router.get("/users", getAllUserForAdmin);

// Delete one user
router.delete("/user/:id", deleteUser);

// Update user details
router.patch("/user/:id", updateUser);

module.exports = router;
