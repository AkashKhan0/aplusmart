import express from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { protectUser } from "../middleware/protectUser.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Generate 6 digit unique orderId
function generateOrderId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST → create order
router.post("/", async (req, res) => {
  try {
    const {
      billing,
      cart,
      shippingMethod,
      shippingCharge,
      paymentMethod,
      points,
      grandTotal,
    } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart empty" });
    }

    // Get user from cookie token (assuming cookie has userToken)
    const token = req.cookies.userToken;
    if (!token) return res.status(401).json({ error: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.offerPrice,
      colors: item.colors || [],
      image: item.images?.[0] || "",
    }));

    const order = await Order.create({
      user: user._id,
      orderId: generateOrderId(),
      billing,
      items,
      shippingMethod,
      shippingCharge,
      paymentMethod,
      points,
      grandTotal,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Order error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET → fetch all orders (admin)
router.get("/",  async (req, res) => {
  try {
    const orders = await Order.find().populate("user").sort({ createdAt: -1 });  
    // ensure array res.status(200).json(orders);
    res.json(Array.isArray(orders) ? orders : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET → logged in user orders
router.get("/my", protectUser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(Array.isArray(orders) ? orders : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single order by orderId
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId }).populate(
      "user"
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE order status
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(order);
});

// UPDATE payment status
router.put("/:id/payment", async (req, res) => {
  const { paymentStatus } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { paymentStatus },
    { new: true }
  );

  res.json(order);
});

// DELETE order
router.delete("/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
});

export default router;
