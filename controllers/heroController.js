const Hero = require("../models/heroModel");

// Add Hero Section
exports.addHero = async (req, res) => {
  try {
    const { title, subtitle, location, size } = req.body;

    const existing = await Hero.findOne();
    if (existing) {
      return res.status(400).json({ message: "Hero already exists. Use update." });
    }

    const videoUrl = req.file
      ? `/uploads/videos/${req.file.filename}`
      : null;

    if (!videoUrl) {
      return res.status(400).json({ message: "Video is required" });
    }

    const hero = await Hero.create({
      title,
      subtitle,
      location,
      size,
      videoUrl,
    });

    res.status(201).json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Hero Section
exports.updateHero = async (req, res) => {
  try {
    const { title, subtitle, location, size } = req.body;

    const hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    if (req.file) {
      hero.videoUrl = `/uploads/videos/${req.file.filename}`;
    }

    hero.title = title || hero.title;
    hero.subtitle = subtitle || hero.subtitle;
    hero.location = location || hero.location;
    hero.size = size || hero.size;

    await hero.save();

    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Hero Section
exports.getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ message: "No hero data found" });

    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
