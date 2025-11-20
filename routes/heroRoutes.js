const express = require("express");
const router = express.Router();

const uploadVideo = require("../middleware/uploadVideo");
const { protect } = require("../middleware/authMiddleware");

const {
  addHero,
  updateHero,
  getHero,
} = require("../controllers/heroController");

// Add Hero (with video upload)
router.post("/", protect, uploadVideo.single("video"), addHero);

// Update Hero (with video upload)
router.put("/", protect, uploadVideo.single("video"), updateHero);

// Public Fetch
router.get("/", getHero);

module.exports = router;
