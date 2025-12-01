import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// Create category
router.post("/", async (req, res) => {
  try {
    const { mainCategory, subCategory } = req.body;
    if (!mainCategory || !subCategory) {
      return res.status(400).json({ error: "Both fields are required" });
    }

    const created = await Category.create({ mainCategory, subCategory });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const list = await Category.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update category
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { mainCategory, subCategory } = req.body;
    const updated = await Category.findByIdAndUpdate(
      id,
      { mainCategory, subCategory },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Category not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
