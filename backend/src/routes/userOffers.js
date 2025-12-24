import express from "express";
import UserOffer from "../models/UserOffer.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const offer = await UserOffer.create(req.body);
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const offers = await UserOffer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await UserOffer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await UserOffer.findByIdAndDelete(req.params.id);
    res.json({ message: "User Offer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
