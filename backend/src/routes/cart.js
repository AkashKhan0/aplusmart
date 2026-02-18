import express from "express";
import Cart from "../models/Cart.js";
import { protectUser } from "../middleware/protectUser.js";

const router = express.Router();

/* =====================
   GET CART
===================== */
router.get("/", protectUser, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  res.json({ cart: cart?.items || [] });
});

/* =====================
   SET / UPDATE CART
===================== */
router.post("/", protectUser, async (req, res) => {
  const items = Array.isArray(req.body.cart) ? req.body.cart : [];

  const cart = await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { items },
    { new: true, upsert: true },
  );

  res.json({ success: true, cartCount: cart.items.length });
});

/* =====================
   CLEAR CART
===================== */
router.delete("/", protectUser, async (req, res) => {
  await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { items: [] },
  );

  res.json({ success: true });
});

export default router;
