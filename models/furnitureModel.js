const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Furniture", furnitureSchema);
