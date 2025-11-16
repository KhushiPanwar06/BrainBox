const express = require("express");
const { createProduct, getProducts } = require("../controllers/productController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Create product (only for logged-in users)
router.post("/", protect, createProduct);

// Get all products (public)
router.get("/", getProducts);

module.exports = router;
