import express from "express";
import Order from "../models/Order.js";
import adminAuth from "../middleware/adminAuth.js"; // admin auth

const router = express.Router();

// ==================== USER PLACE ORDER ====================
router.post("/", protectUser, async (req, res) => {
  try {
    const { orderId, billing, items, shippingMethod, shippingCharge, paymentMethod, points, grandTotal } = req.body;

    const order = await Order.create({
      user: req.user._id,
      billing,
      orderId,
      items,
      shippingMethod,
      shippingCharge,
      paymentMethod,
      points,
      grandTotal,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== GET USER ORDERS ====================
router.get("/myorders", protectUser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== ADMIN GET ALL ORDERS ====================
router.get("/", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "fullName resellerName emailOrPhone");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== ADMIN UPDATE ORDER STATUS ====================
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== ADMIN DELETE ORDER ====================
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
