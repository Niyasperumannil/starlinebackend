const Project = require("../models/projectModel");
const slugify = require("slugify");

exports.createProject = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;

    if (!title)
      return res.status(400).json({ message: "Title is required" });

    const slug = slugify(title, { lower: true, strict: true });

    const coverImage = req.files.coverImage
      ? req.files.coverImage[0].filename
      : null;

    const gallery = req.files.gallery
      ? req.files.gallery.map((f) => f.filename)
      : [];

    const project = await Project.create({
      title,
      subtitle,
      description,
      slug,
      coverImage,
      gallery,
    });

    res.json({ success: true, project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

exports.getProjectBySlug = async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project)
    return res.status(404).json({ message: "Project not found" });

  res.json(project);
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
