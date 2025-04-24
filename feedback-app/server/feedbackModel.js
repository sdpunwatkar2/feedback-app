const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
