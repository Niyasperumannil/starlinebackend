const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create upload folder if missing
const uploadDir = path.join(__dirname, "../uploads/videos");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "video_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [".mp4", ".mov", ".avi", ".mkv"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.includes(ext)) {
    return cb(new Error("Only video files are allowed"), false);
  }

  cb(null, true);
};

const uploadVideo = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
});

module.exports = uploadVideo;
