const express = require("express");
const Exercise = require("../models/Exercise");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create an Exercise
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, category, duration, difficulty, caloriesBurned, videoUrl, poseKeyPoints } = req.body;

    const exercise = new Exercise({ name, description, category, duration, difficulty, caloriesBurned, videoUrl, poseKeyPoints });
    await exercise.save();

    res.status(201).json({ message: "Exercise created successfully", exercise });
  } catch (error) {
    res.status(500).json({ message: "Error creating exercise", error });
  }
});

// Get All Exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercises", error });
  }
});

// Get Single Exercise by ID
router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });

    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercise", error });
  }
});

// Update an Exercise
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });

    res.status(200).json({ message: "Exercise updated successfully", exercise });
  } catch (error) {
    res.status(500).json({ message: "Error updating exercise", error });
  }
});

// Delete an Exercise
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exercise", error });
  }
});

module.exports = router;
