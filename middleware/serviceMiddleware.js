const multer = require("multer");
const path = require("path");

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "services"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, "service_" + Date.now() + ext);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new Error("Only images allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

module.exports = upload;
