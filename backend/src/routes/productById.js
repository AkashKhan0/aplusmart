import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ================= GET PRODUCT BY ID =================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ================= UPDATE PRODUCT =================
// Now it works with JSON payload (not multipart)
router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      mainCategory,
      subCategory,
      brand,
      regularPrice,
      offerPrice,
      resellerPrice,
      stockStatus,
      colors,
      shortTitle,
      shortDescription,
      shortList,
      specifications,
      images,
      offerStartDate,
      offerEndDate,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Update simple fields
    product.name = name ?? product.name;
    product.mainCategory = mainCategory ?? product.mainCategory;
    product.subCategory = subCategory ?? product.subCategory;
    product.brand = brand ?? product.brand;
    product.regularPrice = regularPrice ?? product.regularPrice;
    product.offerPrice = offerPrice ?? product.offerPrice;
    product.resellerPrice = resellerPrice ?? product.resellerPrice;
    product.stockStatus = stockStatus ?? product.stockStatus;
    product.shortTitle = shortTitle ?? product.shortTitle;
    product.shortDescription = shortDescription ?? product.shortDescription;

    // Update arrays safely
    product.colors = Array.isArray(colors) ? colors : product.colors;
    product.shortList = Array.isArray(shortList)
      ? shortList
      : product.shortList;
    product.specifications = Array.isArray(specifications)
      ? specifications
      : product.specifications;
    product.images = Array.isArray(images) ? images : product.images;
    product.offerStartDate = offerStartDate
      ? new Date(offerStartDate)
      : product.offerStartDate;
    product.offerEndDate = offerEndDate
      ? new Date(offerEndDate)
      : product.offerEndDate;

    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ================= DELETE PRODUCT =================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
