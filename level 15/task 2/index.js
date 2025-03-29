require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);
let journalCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("journalDB");
    journalCollection = db.collection("entries");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}
connectDB();


app.post("/entries", async (req, res) => {
    try {
      console.log("🔍 Received request body:", req.body); // Debugging log
  
      const { title, content, tags } = req.body;
  
      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
      }
  
      const newEntry = {
        title,
        content,
        tags: Array.isArray(tags) ? tags : [],
        date: new Date(),
      };
  
      const result = await journalCollection.insertOne(newEntry);
      res.status(201).json({ message: "Entry added!", id: result.insertedId });
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ error: "Failed to add entry" });
    }
  });
  
  


app.get("/entries", async (req, res) => {
  try {
    const { title, date, tag } = req.query;
    const filter = {};
    if (title) filter.title = new RegExp(title, "i");
    if (date) filter.date = { $gte: new Date(date), $lt: new Date(date + "T23:59:59.999Z") };
    if (tag) filter.tags = tag;

    const entries = await journalCollection.find(filter).sort({ date: -1 }).toArray();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});


app.put("/entries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const updatedEntry = { title, content, tags };
    await journalCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedEntry });
    res.json({ message: "Entry updated!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update entry" });
  }
});


app.delete("/entries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await journalCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Entry deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
});


app.listen(3000, () => console.log("🚀 Server running on port 3000"));
