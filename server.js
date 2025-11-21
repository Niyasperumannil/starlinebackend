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

/* -------------------------------------------------
   CORS (Express 5 compatible)
--------------------------------------------------- */
app.use(cors({
  origin: [
    "https://starlinegroup.ae",
    "https://www.starlinegroup.ae",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

/* -------------------------------------------------
   Create upload directories if missing
--------------------------------------------------- */
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

/* -------------------------------------------------
   Static file serving
--------------------------------------------------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -------------------------------------------------
   API Routes
--------------------------------------------------- */
app.use("/api/admin", adminRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/furniture", furnitureRoutes);
app.use("/api/contact", contactRoutes);

/* -------------------------------------------------
   Default Home Route (Fixes curl test)
--------------------------------------------------- */
app.get("/", (req, res) => {
  res.send("Starline Backend API is Running 🚀");
});

/* -------------------------------------------------
   Mongo + Start Server
--------------------------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5008;
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server started on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });
