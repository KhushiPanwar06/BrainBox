const express = require("express");
const { generateReply } = require("../utils/geminiClient");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await generateReply(message);

    res.json({ reply });
  } catch (error) {
    console.error("BrainBox Error:", error);
    res.status(500).json({ reply: "Error generating AI response." });
  }
});

module.exports = router;
