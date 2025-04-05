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
  stock: { type: Number, required: true }
});
const Product = mongoose.model("Product", productSchema);

// 👤 User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
});
const User = mongoose.model("User", userSchema);

// 🛍 Order Schema
const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  });
  
  const Order = mongoose.model("Order", OrderSchema);
// 🔥 Custom Error Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}
app.post("/products/add", async (req, res) => {
    try {
      const { name, price, stock } = req.body;
  
      if (!name || !price || !stock) {
        return res.status(400).json({ success: false, error: "All fields are required!" });
      }
  
      const newProduct = new Product({ name, price, stock });
      await newProduct.save();
  
      res.status(201).json({ success: true, message: "Product added successfully!", product: newProduct });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

// 🔄 Create Order with Transaction
app.post("/users/create", async (req, res) => {
    try {
      const { name, email } = req.body;
  
      if (!name || !email) {
        return res.status(400).json({ success: false, error: "Name and Email are required" });
      }
  
      const user = new User({ name, email });
      await user.save();
  
      res.status(201).json({ success: true, message: "User created successfully!", user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/orders/create", async (req, res) => {
    try {
      const { userId, products } = req.body;
  
      if (!userId || !products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ success: false, error: "Invalid order data" });
      }
  
      let totalAmount = 0;
  
      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) return res.status(404).json({ success: false, error: "Product not found" });
  
        totalAmount += product.price * item.quantity;
      }
  
      const newOrder = new Order({ userId, products, totalAmount });
      await newOrder.save();
  
      res.status(201).json({ success: true, message: "Order created successfully!", order: newOrder });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  

// 🔄 Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, error: err.message });
  }

  res.status(500).json({ success: false, error: "Internal Server Error" });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
