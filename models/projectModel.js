const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    category: { type: String },

    coverImage: { type: String, required: true }, // main image
    gallery: [String], // additional images
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
