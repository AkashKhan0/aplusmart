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
      grandTotal,
      usedPoints = 0,
      pointsDiscount = 0,
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

    // 🔐 POINTS VALIDATION
    if (usedPoints > user.points || usedPoints < 0) {
      return res.status(400).json({ error: "Invalid points usage" });
    }
    if (grandTotal < 0) {
      return res.status(400).json({ error: "Invalid total amount" });
    }
    // 🔻 DEDUCT USED POINTS
    user.points -= usedPoints;

    // 🧮 CALCULATE POINTS (Backend only)
    let earnedPoints = 0;
    cart.forEach((item) => {
      if (!item.hasOffer) {
        const productPoint = Math.floor(
          (item.offerPrice * item.quantity) / 100,
        );
        earnedPoints += Math.min(productPoint, 500);
      }
    });

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
      usedPoints,
      pointsDiscount,
      points: earnedPoints,
      grandTotal,
    });

    user.points += earnedPoints;

    // ⭐ ADD POINTS TO USER DATABASE
    user.pointsHistory.push({
      points: earnedPoints - usedPoints,
      earned: earnedPoints,
      used: usedPoints,
      orderId: order.orderId,
    });
    await user.save();

    res.status(201).json({
      success: true,
      orderId: order.orderId,
      earnedPoints,
    });
  } catch (err) {
    console.error("Order error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET → fetch all orders (admin)
router.get("/", async (req, res) => {
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
      "user",
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE order status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    // 1️⃣ Order খুঁজে বের করো
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 2️⃣ যদি cancelled করা হয়
    if (status === "cancelled" && order.status !== "cancelled") {
      const user = await User.findById(order.user);

      if (user && order.points > 0) {
        // user points rollback
        user.points -= order.points;

        user.pointsHistory.push({
          orderId: order.orderId,
          points: -order.points,
          note: "Order cancelled",
          date: new Date(),
        });

        await user.save();
      }
      // order points reset
      order.points = 0;
    }
    // 3️⃣ status update (ALWAYS)
    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// UPDATE payment status
router.put("/:id/payment", async (req, res) => {
  const { paymentStatus } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { paymentStatus },
    { new: true },
  );
  res.json(order);
});

// DELETE order
// router.delete("/:id", async (req, res) => {
//   await Order.findByIdAndDelete(req.params.id);
//   res.json({ message: "Order deleted" });
// });

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 1️⃣ User fetch
    const user = await User.findById(order.user);
    if (user) {
      // 2️⃣ Rollback points only if order.points > 0
      if (order.points > 0) {
        user.points -= order.points;
      }

      // 3️⃣ Remove this order from pointsHistory
      user.pointsHistory = user.pointsHistory.filter(
        (p) => p.orderId !== order.orderId
      );

      await user.save();
    }

    // 4️⃣ Delete the order
    await order.deleteOne();

    res.json({ success: true, message: "Order deleted & points cleaned" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;