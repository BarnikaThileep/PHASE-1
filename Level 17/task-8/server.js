const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/productDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// 📌 Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true }
});

// 🔍 Enable Text Search
productSchema.index({ name: "text" });

const Product = mongoose.model("Product", productSchema);

// 🚀 Seed Database (Run this once)
const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: "Laptop", price: 1200, category: "Electronics", stock: 10 },
      { name: "Smartphone", price: 800, category: "Electronics", stock: 15 },
      { name: "Headphones", price: 100, category: "Electronics", stock: 50 },
      { name: "T-Shirt", price: 25, category: "Clothing", stock: 100 },
      { name: "Jeans", price: 40, category: "Clothing", stock: 60 },
      { name: "Jacket", price: 80, category: "Clothing", stock: 30 },
      { name: "Sneakers", price: 120, category: "Footwear", stock: 40 },
      { name: "Sandals", price: 35, category: "Footwear", stock: 50 },
      { name: "Blender", price: 70, category: "Home Appliances", stock: 20 },
      { name: "Microwave", price: 150, category: "Home Appliances", stock: 10 },
      { name: "Refrigerator", price: 600, category: "Home Appliances", stock: 5 },
      { name: "Gaming Console", price: 500, category: "Gaming", stock: 8 },
      { name: "Monitor", price: 200, category: "Electronics", stock: 25 },
      { name: "Mouse", price: 30, category: "Electronics", stock: 70 },
      { name: "Keyboard", price: 45, category: "Electronics", stock: 60 }
    ]);
    console.log("✅ Products Seeded Successfully");
  }
};
seedProducts();

// ➕ Add Product
app.post("/products/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ success: true, message: "Product Added!", product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 📊 Aggregation: Get Product Statistics by Category
app.get("/products/stats", async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$category", totalProducts: { $sum: 1 }, totalStock: { $sum: "$stock" } } },
      { $sort: { totalProducts: -1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔎 Complex Queries: Price Range & Stock Filtering
app.get("/products/filter", async (req, res) => {
  try {
    const { minPrice = 0, maxPrice = 9999, minStock = 0 } = req.query;
    const products = await Product.find({
      price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) },
      stock: { $gte: parseInt(minStock) }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Text Search on Product Names
app.get("/products/search/:query", async (req, res) => {
  try {
    const products = await Product.find({ $text: { $search: req.params.query } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📉 Aggregation: Calculate Average Prices by Category
app.get("/products/avg-price", async (req, res) => {
  try {
    const avgPrices = await Product.aggregate([
      { $group: { _id: "$category", avgPrice: { $avg: "$price" } } },
      { $sort: { avgPrice: -1 } }
    ]);
    res.json(avgPrices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔄 Sorting & Advanced Filtering
app.get("/products/sort", async (req, res) => {
  try {
    const { sortBy = "price", order = "asc", category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ [sortBy]: order === "asc" ? 1 : -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
