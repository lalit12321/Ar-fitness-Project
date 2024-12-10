const mongoose = require("mongoose");

// Define Exercise Schema
const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["Strength", "Cardio", "Flexibility"], required: true },
    duration: { type: Number, required: true }, // in seconds
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    caloriesBurned: { type: Number, required: true }, // in kcal
    videoUrl: { type: String, required: false }, // Optional instructional video
    poseKeyPoints: [
      {
        point: { type: String, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
