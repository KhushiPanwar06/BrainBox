// routes/chat.js
const express = require("express");
const Message = require("../models/Message.js");
const { generateReply } = require("../utils/geminiClient.js");

const router = express.Router();

/**
 * POST /chat
 * Body: { message: "user text" }
 * Saves the user message and assistant reply to DB and returns reply.
 */
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid 'message' in request body." });
    }

    // Save user message
    const userMsg = await Message.create({ role: "user", text: message });

    // Build a prompt — customize as you like
    const prompt = message;

    // Call Gemini
    const assistantText = await generateReply(prompt);

    // Save assistant message
    const assistantMsg = await Message.create({ role: "assistant", text: assistantText || "" });

    // Return both IDs and the reply text
    res.json({
      reply: assistantText,
      userMessageId: userMsg._id,
      assistantMessageId: assistantMsg._id
    });

  } catch (err) {
    console.error("Chat route error:", err);
    res.status(500).json({ error: "Server error while processing chat." });
  }
});

module.exports = router;
