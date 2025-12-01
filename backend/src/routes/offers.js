import express from "express";
import Offer from "../models/Offer.js";

const router = express.Router();

// ✅ GET ALL OFFERS
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ CREATE OFFER
router.post("/", async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE OFFER
router.put("/:id", async (req, res) => {
  try {
    const updated = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Offer not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE OFFER
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Offer.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Offer not found" });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
