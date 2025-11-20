const express = require("express");
const router = express.Router();

const upload = require("../middleware/newsImageMiddleware");
const adminProtect = require("../middleware/authMiddleware").protect;

const {
  createNews,
  getNews,
  getSingleNews,
  deleteNews,
} = require("../controllers/newsController");

// CREATE (admin only)
router.post("/create", adminProtect, upload.single("image"), createNews);

// GET ALL
router.get("/", getNews);

// GET SINGLE
router.get("/:id", getSingleNews);

// DELETE (admin only)
router.delete("/:id", adminProtect, deleteNews);

module.exports = router;
