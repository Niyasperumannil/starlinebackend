const Service = require("../models/serviceModel");

exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const newService = await Service.create({
      title,
      description,
      image: `/uploads/services/${req.file.filename}`,
    });

    res.json({ message: "Service created", service: newService });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
