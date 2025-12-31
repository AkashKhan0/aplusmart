import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import User from "../models/User.js";
import { protectUser } from "../middleware/protectUser.js";

const router = express.Router();

// GET all users (admin only)
router.get("/", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/me → cookie-based JWT authentication
router.get("/me", protectUser, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE user (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
