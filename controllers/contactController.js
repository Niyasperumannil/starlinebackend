const Contact = require("../models/contactModel");

// 📩 User sends a message
exports.createMessage = async (req, res) => {
  try {
    const { name, phone, message, privacyAccepted } = req.body;

    if (!name || !phone || !message)
      return res.status(400).json({ message: "All fields are required" });

    const msg = await Contact.create({
      name,
      phone,
      message,
      privacyAccepted,
      isRead: false,
    });

    res.json({ message: "Message sent successfully", data: msg });
  } catch (err) {
    console.log("Create Message Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📥 Fetch all messages
exports.getMessages = async (req, res) => {
  try {
    const msgs = await Contact.find().sort({ createdAt: -1 });
    res.json(msgs);
  } catch (err) {
    console.log("Get Messages Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔔 Unread notification count
exports.unreadCount = async (req, res) => {
  try {
    const unread = await Contact.countDocuments({ isRead: false });
    res.json({ unread });
  } catch (err) {
    console.log("Unread Count Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// 👁 Mark message as read
exports.markRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndUpdate(id, { isRead: true });
    res.json({ message: "Marked as read" });
  } catch (err) {
    console.log("Mark Read Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ❌ Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    console.log("Delete Message Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
