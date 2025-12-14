import express from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const router = express.Router();

router.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
