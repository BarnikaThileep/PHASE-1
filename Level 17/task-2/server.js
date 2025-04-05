// Install necessary packages
// npm install express mongoose dotenv

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Simple route
app.get("/", (req, res) => {
  res.send("Connected to MongoDB");
});

// Route to return User schema definition
app.get("/user-schema", (req, res) => {
  res.json(User.schema.paths);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
