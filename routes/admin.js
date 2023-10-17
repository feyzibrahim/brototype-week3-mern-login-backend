const express = require("express");
const {
  getAllUserForAdmin,
  deleteUser,
  updateUser,
  newUser,
} = require("../controllers/adminController");

const requireAuth = require("../middleware/requireAuth");

// Controller Functions
const router = express.Router();

router.use(requireAuth);

// Get all users
router.get("/users", getAllUserForAdmin);

// Create new user
router.post("/newUser", newUser);

// Delete one user
router.delete("/user/:id", deleteUser);

// Update user details
router.patch("/user/:id", updateUser);

module.exports = router;
