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
  const removeItemIds = req.body.removeItemIds || [];
  let items = Array.isArray(req.body.cart) ? req.body.cart : null;

  const cartDoc = await Cart.findOne({ userId: req.user._id });

  if (!cartDoc) {
    // create new if not exist
    const newCart = await Cart.create({
      userId: req.user._id,
      items: items || [],
    });
    return res.json({ success: true, cartCount: newCart.items.length });
  }

  if (removeItemIds.length > 0) {
    // remove only selected items
    cartDoc.items = cartDoc.items.filter(
      (item) => !removeItemIds.includes(item.cartItemId)
    );
  } else if (items) {
    // replace cart only if cart array passed
    cartDoc.items = items;
  }

  await cartDoc.save();
  res.json({ success: true, cartCount: cartDoc.items.length });
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
