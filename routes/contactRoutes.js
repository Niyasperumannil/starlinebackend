const express = require("express");
const router = express.Router();

const {
  createMessage,
  getMessages,
  unreadCount,
  markRead,
  deleteMessage,
} = require("../controllers/contactController");

// PUBLIC
router.post("/", createMessage);

// ADMIN
router.get("/notifications", unreadCount); // must be before "/"
router.get("/", getMessages);
router.put("/read/:id", markRead);
router.delete("/:id", deleteMessage);

module.exports = router;
