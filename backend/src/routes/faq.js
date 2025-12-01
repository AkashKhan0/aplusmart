import express from "express";
import Faq from "../models/Faq.js";

const router = express.Router();

// CREATE FAQ
router.post("/", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const faq = await Faq.create({ question, answer });
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL FAQ
router.get("/", async (req, res) => {
  try {
    const faqList = await Faq.find().sort({ createdAt: -1 });
    res.json(faqList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE FAQ
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const updated = await Faq.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "FAQ not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE FAQ
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Faq.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ error: "FAQ not found" });

    res.json({ message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
