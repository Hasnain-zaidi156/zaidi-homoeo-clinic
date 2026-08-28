const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const requireAdmin = require("../middleware/auth");

// POST /api/reviews  (public) — a patient leaves a star rating + comment
router.post("/", async (req, res) => {
  try {
    const { name, rating, comment } = req.body || {};

    const stars = Number(rating);
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Please enter your name." });
    }
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      return res.status(400).json({ error: "Please choose a rating from 1 to 5." });
    }

    const review = await Review.create({
      name,
      rating: stars,
      comment: comment || "",
    });

    return res.status(201).json({ ok: true, review });
  } catch (err) {
    console.error("[reviews] Create failed:", err.message);
    return res.status(500).json({ error: "Could not save the review." });
  }
});

// GET /api/reviews  (admin) — every review, newest first, + the average
router.get("/", requireAdmin, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    const count = reviews.length;
    const average =
      count === 0
        ? 0
        : Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / count) * 10) / 10;
    return res.json({ reviews, average, count });
  } catch (err) {
    console.error("[reviews] List failed:", err.message);
    return res.status(500).json({ error: "Could not load reviews." });
  }
});

// DELETE /api/reviews/:id  (admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found." });
    return res.json({ ok: true });
  } catch (err) {
    console.error("[reviews] Delete failed:", err.message);
    return res.status(500).json({ error: "Could not delete the review." });
  }
});

module.exports = router;
