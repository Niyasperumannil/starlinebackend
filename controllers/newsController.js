const News = require("../models/newsModel");

exports.createNews = async (req, res) => {
  try {
    const { title, desc, date } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const news = await News.create({
      title,
      desc,
      date,
      image: `/uploads/news/${req.file.filename}`,
    });

    res.json({ message: "News created", news });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNews = async (req, res) => {
  try {
    const newsItems = await News.find().sort({ createdAt: -1 });
    res.json(newsItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
