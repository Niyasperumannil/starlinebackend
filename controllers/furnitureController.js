const Furniture = require("../models/furnitureModel");
const fs = require("fs");
const path = require("path");

// CREATE
exports.createFurniture = async (req, res) => {
  try {
    const { name, title, brand, price } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const item = await Furniture.create({
      name,
      title,
      brand,
      price,
      img: `/uploads/furniture/${req.file.filename}`,
    });

    res.json({ message: "Furniture added", item });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL
exports.getFurniture = async (req, res) => {
  const items = await Furniture.find().sort({ createdAt: -1 });
  res.json(items);
};

// GET SINGLE
exports.getFurnitureById = async (req, res) => {
  const item = await Furniture.findById(req.params.id);
  res.json(item);
};

// UPDATE
exports.updateFurniture = async (req, res) => {
  try {
    const item = await Furniture.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    if (req.file) {
      const oldImg = path.join(__dirname, "..", item.img);
      if (fs.existsSync(oldImg)) fs.unlinkSync(oldImg);

      item.img = `/uploads/furniture/${req.file.filename}`;
    }

    item.name = req.body.name;
    item.title = req.body.title;
    item.brand = req.body.brand;
    item.price = req.body.price;

    await item.save();
    res.json({ message: "Updated", item });
  } catch {
    res.status(500).json({ message: "Error updating" });
  }
};

// DELETE
exports.deleteFurniture = async (req, res) => {
  try {
    const item = await Furniture.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    const imgPath = path.join(__dirname, "..", item.img);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    await item.deleteOne();

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting" });
  }
};
