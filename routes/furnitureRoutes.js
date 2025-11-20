const express = require("express");
const router = express.Router();

const upload = require("../middleware/furnitureImage");
const { protect } = require("../middleware/authMiddleware");

const {
  createFurniture,
  getFurniture,
  getFurnitureById,
  updateFurniture,
  deleteFurniture,
} = require("../controllers/furnitureController");

router.get("/", getFurniture);
router.get("/:id", getFurnitureById);

router.post("/", protect, upload.single("img"), createFurniture);
router.put("/:id", protect, upload.single("img"), updateFurniture);
router.delete("/:id", protect, deleteFurniture);

module.exports = router;
