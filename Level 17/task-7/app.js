const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/usersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isActive: { type: Boolean, default: true },
});

// 🔐 Pre-save hook: hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 📝 Post-save hook: log new user
userSchema.post("save", function (doc) {
  console.log(`✅ New user created: ${doc.email}`);
});

// 🚫 Pre-find hook: exclude inactive users
userSchema.pre(/^find/, function (next) {
  this.where({ isActive: true });
  next();
});

// 🧾 Instance method: return user profile
userSchema.methods.getProfile = function () {
  return {
    name: this.name,
    email: this.email,
    active: this.isActive,
  };
};

// 📬 Static method: find users by email domain
userSchema.statics.findByEmailDomain = function (domain) {
    
    const regex = new RegExp(`@${domain}$`, "i"); // "i" makes it case-insensitive
    return this.find({ email: { $regex: regex } });
  };
  

const User = mongoose.model("User", userSchema);

// ➕ Route: Create new user
app.post("/users/create", async (req, res) => {
  const { name, email, password, isActive } = req.body;
  try {
    const user = new User({ name, email, password, isActive });
    await user.save();
    res.json({ success: true, message: "User created!" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 🔍 Route: Get all active users
app.get("/users/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👤 Route: Get user profile by ID
app.get("/users/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.getProfile());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔎 Route: Find users by email domain
app.get("/users/by-domain/:domain", async (req, res) => {
  try {
    const users = await User.findByEmailDomain(req.params.domain);
    console.log("🔍 Users found:", users); // Debugging log
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
