const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    date: { type: String, required: true },
    image: { type: String, required: true }, // /uploads/news/image.jpg
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
