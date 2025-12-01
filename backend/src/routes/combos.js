import express from "express";
import Combo from "../models/Combo.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const combo = await Combo.create(req.body);
    res.json({ success: true, combo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const combos = await Combo.find().sort({ createdAt: -1 });
    res.json(combos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const combo = await Combo.findById(req.params.id);
    res.json(combo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Combo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Combo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
