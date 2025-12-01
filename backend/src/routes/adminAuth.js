import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "aplusmartbd_admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "eidai_password";

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid admin credentials" });
  }

  // Generate JWT
  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ message: "Admin login successful", token });
});

export default router;
