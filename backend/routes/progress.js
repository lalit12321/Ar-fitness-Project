const express = require("express");
const Progress = require("../models/Progress");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Progress
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { exerciseId, duration, caloriesBurned, score, feedback } = req.body;

    const progress = new Progress({
      userId: req.user.id,
      exerciseId,
      duration,
      caloriesBurned,
      score,
      feedback,
    });

    await progress.save();
    res.status(201).json({ message: "Progress added successfully", progress });
  } catch (error) {
    res.status(500).json({ message: "Error adding progress", error });
  }
});

// Get User Progress
router.get("/", authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.id }).populate("exerciseId");
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress", error });
  }
});

// Delete Progress by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.findByIdAndDelete(req.params.id);
    if (!progress) return res.status(404).json({ message: "Progress not found" });

    res.status(200).json({ message: "Progress deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting progress", error });
  }
});

module.exports = router;
