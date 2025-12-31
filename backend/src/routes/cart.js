
import express from "express";
import { protectUser } from "../middleware/protectUser.js";

const router = express.Router();

/* =====================
   GET CART
===================== */
router.get("/", protectUser, (req, res) => {
  const key = `cart_${req.user._id}`;
  let cart = [];

  try {
    if (req.cookies[key]) {
      cart = JSON.parse(req.cookies[key]);
      if (!Array.isArray(cart)) cart = [];
    }
  } catch {
    cart = [];
  }

  res.json({ cart });
});

/* =====================
   SET CART
===================== */
router.post("/", protectUser, (req, res) => {
  const key = `cart_${req.user._id}`;
  const cart = Array.isArray(req.body.cart) ? req.body.cart : [];

  res.cookie(key, JSON.stringify(cart), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    path: "/",
  });

  res.json({ success: true, cartCount: cart.length });
});

/* =====================
   CLEAR CART
===================== */
router.delete("/", protectUser, (req, res) => {
  const key = `cart_${req.user._id}`;
  res.clearCookie(key, {
    path: "/",
  });

  res.json({ success: true });
});

export default router;
