// models/Message.js
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant", "system"],
    required: true
  },
  text: { type: String, required: true },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

// Check if model already exists (for hot reloads in dev)
const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

module.exports = Message;
