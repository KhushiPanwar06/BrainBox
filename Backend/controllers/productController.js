const Product = require("../models/productModel.js");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({ message: "Name, price and description are required" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image,
      category
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts
};
