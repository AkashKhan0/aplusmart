import express from "express";
import {
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getProfile,
} from "../controllers/authController.js";
import { protectUser } from "../middleware/protectUser.js";
const router = express.Router();
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile", protectUser, getProfile);

export default router;
