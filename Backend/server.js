// server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();
//console.log("Loaded GOOGLE_API_KEY =", process.env.GOOGLE_API_KEY);


// Import Gemini init
const { initGemini } = require("./utils/geminiClient");

// Import routes
const productRoutes = require("./routes/productRoutes.js");
const testRoute = require("./routes/test.js");
const userRoutes = require("./routes/userRoutes.js");
const brainboxRoutes = require("./routes/brainboxRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));


// ===== Initialize Google Gemini =====
if (!process.env.GOOGLE_API_KEY) {
  console.error("❌ GOOGLE_API_KEY is missing in .env");
  process.exit(1);
}

initGemini(process.env.GOOGLE_API_KEY);


// ===== Routes =====
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/test", testRoute);
app.use("/api/brainbox", brainboxRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("Server is running");
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
