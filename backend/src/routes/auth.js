import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ======================= REGISTER =======================
router.post("/signup", async (req, res) => {
  try {
    const { role, fullName, shopName, location, resellerName, emailOrPhone, password } = req.body;

    const existing = await User.findOne({ emailOrPhone });
    if (existing) return res.status(400).json({ error: "Email or phone already exists" });

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      role,
      fullName,
      shopName,
      location,
      resellerName,
      emailOrPhone,
      password: hashedPass,
    });

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================= LOGIN =======================
router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({ emailOrPhone });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
