const express = require("express");
const {
  getAllUserForAdmin,
  deleteUser,
  updateUser,
  newUser,
} = require("../controllers/adminController");
const upload = require("../middleware/upload");

const requireAuth = require("../middleware/requireAuth");

// Controller Functions
const router = express.Router();

router.use(requireAuth);

// Get all users
router.get("/users", getAllUserForAdmin);

// Create new user
router.post("/newUser", upload.single("profilePhoto"), newUser);

// Delete one user
router.delete("/user/:id", deleteUser);

// Update user details
router.patch("/user/:id", upload.single("profilePhoto"), updateUser);

module.exports = router;
