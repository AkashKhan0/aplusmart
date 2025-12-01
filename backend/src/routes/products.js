import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


// ================= GET ALL PRODUCTS =================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/* CREATE PRODUCT */
router.post("/", async (req, res) => {
  try {
    console.log("CREATE PRODUCT PAYLOAD:", req.body);

    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
