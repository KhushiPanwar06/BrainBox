// routes/test.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend (BrainBox) is running",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
