const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const Feedback = require("./feedbackModel");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/feedbacks", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

app.post("/feedbacks", async (req, res) => {
  const { name, message, rating } = req.body;
  const feedback = new Feedback({ name, message, rating });
  await feedback.save();
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
