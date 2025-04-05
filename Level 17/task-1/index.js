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

// Simple route
app.get("/", (req, res) => {
  res.send("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
