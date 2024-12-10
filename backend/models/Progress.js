const mongoose = require("mongoose");

// Define Progress Schema
const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise", required: true },
    date: { type: Date, required: true, default: Date.now },
    duration: { type: Number, required: true }, // in seconds
    caloriesBurned: { type: Number, required: true }, // in kcal
    score: { type: Number, required: true }, // Performance score (e.g., 0-100)
    feedback: { type: String, required: false }, // Optional feedback
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
