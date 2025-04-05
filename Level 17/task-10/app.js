const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


mongoose.connect("mongodb://localhost:27017/authDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 1️⃣ User Schema & Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", UserSchema);

// 🔹 Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// 2️⃣ Register User
app.post("/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

// 3️⃣ Login User & Return JWT
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);
  res.json({ token, role: user.role });
});

// 4️⃣ Middleware: JWT Authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(403).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

// 5️⃣ Middleware: Role-Based Authorization
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: Insufficient role" });
    }
    next();
  };
};

// 6️⃣ Protected Route: User Profile
app.get("/user/profile", authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// 7️⃣ Admin-Only Route
app.get("/admin/dashboard", authenticateJWT, authorizeRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

// 8️⃣ Password Reset - Send Email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

app.post("/auth/reset-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "User not found" });

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Link",
    text: `Use this token to reset your password: ${resetToken}`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) return res.status(500).json({ error: "Error sending email" });
    res.json({ message: "Reset link sent to your email" });
  });
});

// 9️⃣ Password Reset - Change Password
app.post("/auth/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});


// 1️⃣0️⃣ Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
