import express from "express";
import { upload } from "../middleware/upload.js";
import { uploadImage } from "../utils/uploadImage.js";

const router = express.Router();

// ✅ UNLIMITED MULTIPLE IMAGE UPLOAD
router.post("/", upload.array("images"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No image selected" });
    }

    const folder = req.body.folder || "products";
    const urls = [];

    for (const file of req.files) {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const url = await uploadImage(base64, folder);
      urls.push(url);
    }

    return res.json({
      success: true,
      urls,   // ✅ ARRAY OF IMAGE URLS
    });

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
