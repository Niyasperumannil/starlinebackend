const express = require("express");
const router = express.Router();
const upload = require("../middleware/serviceMiddleware");
const adminProtect = require("../middleware/authMiddleware").protect;

const {
  createService,
  getAllServices,
  deleteService,
} = require("../controllers/serviceController");

// CREATE SERVICE (Admin only)
router.post("/create", adminProtect, upload.single("image"), createService);

// GET SERVICES (Public)
router.get("/", getAllServices);

// DELETE 
router.delete("/:id", adminProtect, deleteService);

module.exports = router;
