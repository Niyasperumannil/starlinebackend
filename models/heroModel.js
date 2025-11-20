const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    location: { type: String, required: true },
    size: { type: String, required: true },
    videoUrl: { type: String, required: true }, // uploaded video URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);
