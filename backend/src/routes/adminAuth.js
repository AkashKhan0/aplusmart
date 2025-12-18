import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  console.log("BODY:", req.body);

  const { username, password } = req.body;

  const admin_user = process.env.ADMIN_USERNAME;
  const admin_pass = process.env.ADMIN_PASSWORD;
  const jwt_secret = process.env.JWT_SECRET;

  if (username !== admin_user || password !== admin_pass) {
    return res.status(401).json({ error: "Invalid admin credentials" });
  }

  // Generate JWT
  const token = jwt.sign({ role: "admin" }, jwt_secret, {
    expiresIn: "7d",
  });

  res.status(200).json({ token });
});

export default router;
