const express = require("express");
const upload = require("../middleware/upload");

// Controller Functions
const {
  loginUser,
  signupUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

// Login Route
router.post("/login", loginUser);

// Signup route
router.post("/signup", upload.single("profilePhoto"), signupUser);

// Update User Details
router.patch("/update/:id", upload.single("profilePhoto"), updateUser);

module.exports = router;
