const express = require("express");
const {
  getAllUserForAdmin,
  deleteUser,
  updateUser,
  createUser,
} = require("../controllers/adminController");

const requireAuth = require("../middleware/requireAuth");

// Controller Functions
const router = express.Router();

router.use(requireAuth);

// Get all users
router.get("/users", getAllUserForAdmin);

// Delete one user
router.delete("/user/:id", deleteUser);

// Update user details
router.patch("/user/:id", updateUser);

// Create a new user
router.post("/user", createUser);

module.exports = router;
