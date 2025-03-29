import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/budgetTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB Connection Error"));
db.once("open", () => console.log("✅ Connected to MongoDB"));


const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);


app.post("/transactions", async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;
    const newTransaction = new Transaction({ type, amount, category, date });
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully", newTransaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/transactions/filter", async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (category) {
      query.category = category;
    }

    const transactions = await Transaction.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/summary", async (req, res) => {
  try {
    const income = await Transaction.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const expenses = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = income[0]?.total || 0;
    const totalExpenses = expenses[0]?.total || 0;
    const balance = totalIncome - totalExpenses;

    res.json({ totalIncome, totalExpenses, balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
