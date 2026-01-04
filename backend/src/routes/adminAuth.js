import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin_user = process.env.ADMIN_USERNAME;
  const admin_pass = process.env.ADMIN_PASSWORD;
  const jwt_secret = process.env.JWT_SECRET;

  if (username !== admin_user || password !== admin_pass) {
    return res.status(401).json({ error: "Invalid admin credentials" });
  }

  // Generate JWT
  const token = jwt.sign(
    { id: "admin", role: "admin" },
    jwt_secret,
    { expiresIn: "7d" }
  );

  // ✅ SET COOKIE
  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: false,       // localhost
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Admin login successful",
  });
});

export default router;
