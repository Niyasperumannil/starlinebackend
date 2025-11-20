require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const heroRoutes = require("./routes/heroRoutes");
const projectRoutes = require("./routes/projectRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const newsRoutes = require("./routes/newsRoutes");
const furnitureRoutes = require("./routes/furnitureRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Upload folders
[
  "uploads/services",
  "uploads/news",
  "uploads/projects",
  "uploads/hero",
  "uploads/furniture",
].forEach((dir) => {
  const full = path.join(__dirname, dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
});

// Static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/furniture", furnitureRoutes);
app.use("/api/contact", contactRoutes);

// Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5008, () =>
      console.log("Server running...")
    );
  })
  .catch((err) => console.log(err));
