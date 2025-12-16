import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


// ================= SEARCH PRODUCTS =================
// URL → /products/search?q=iphone
router.get("/search", async (req, res) => {
  try {
    const { q, mainCategory, subCategory } = req.query;

    let filter = {};

    // Normal search
    if (q) {
      const regex = new RegExp(q.trim(), "i");
      filter.$or = [
        { name: regex },
        { brand: regex },
        { mainCategory: regex },
        { subCategory: regex },
      ];
    }

    // Filter by mainCategory
    if (mainCategory) {
      filter.mainCategory = new RegExp(mainCategory, "i");
    }

    // Filter by subCategory
    if (subCategory) {
      filter.subCategory = new RegExp(subCategory, "i");
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ products });
  } catch (error) {
    console.log("SEARCH ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});


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
    const product = await Product.create(req.body);
    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ✅ GET SINGLE PRODUCT BY ID + RELATED PRODUCTS
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // --- main product ---
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    // --- related products by subCategory ---
    const relatedProducts = await Product.find({
      subCategory: {
        $regex: new RegExp(`^${product.subCategory.trim()}$`, "i"),
      },
      _id: { $ne: product._id },
    })
      .limit(5)
      .sort({ createdAt: -1 });

    // --- send final response ---
    res.status(200).json({
      product,
      relatedProducts,
    });
  } catch (err) {
    console.log("PRODUCT ROUTE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
