const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getProjectBySlug,
  deleteProject,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");
const uploadImages = require("../middleware/uploadImage");

const uploader = uploadImages.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]);

router.post("/create", protect, uploader, createProject); // ✅ FIXED
router.get("/", getAllProjects);
router.get("/:slug", getProjectBySlug);
router.delete("/:id", protect, deleteProject);

module.exports = router;
