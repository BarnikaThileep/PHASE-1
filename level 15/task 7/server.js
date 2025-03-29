const express = require("express");
const mongoose = require("mongoose");
const Parser = require("rss-parser");
require("dotenv").config();

const app = express();
const parser = new Parser();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/rssAggregator";


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


const articleSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  pubDate: Date,
  source: String,
  isRead: { type: Boolean, default: false }
});

const Article = mongoose.model("Article", articleSchema);

app.use(express.json());

const fetchAndStoreFeed = async (feedUrl) => {
    try {
      console.log(`Fetching feed: ${feedUrl}`);
      const feed = await parser.parseURL(feedUrl);
      console.log(`Fetched ${feed.items.length} articles from ${feed.title}`);
  
      for (const item of feed.items) {
        const exists = await Article.findOne({ link: item.link });
  
        if (!exists) {
          const newArticle = await Article.create({
            title: item.title,
            link: item.link,
            description: item.contentSnippet || item.description,
            pubDate: new Date(item.pubDate),
            source: feed.title,
          });
          console.log("Saved article:", newArticle);
        } else {
          console.log("Article already exists:", exists.title);
        }
      }
    } catch (error) {
      console.error("Error fetching RSS feed:", error.message);
    }
  };
  




app.post("/api/add", async (req, res) => {
  const { feedUrl } = req.body;
  if (!feedUrl) return res.status(400).json({ error: "Feed URL is required" });

  await fetchAndStoreFeed(feedUrl);
  res.json({ message: "Feed fetched and stored" });
});


app.get("/api/articles", async (req, res) => {
  const articles = await Article.find().sort({ pubDate: -1 });
  res.json(articles);
});

app.get("/api/articles/source/:source", async (req, res) => {
  const articles = await Article.find({ source: req.params.source });
  res.json(articles);
});

app.get("/api/articles/search/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  const articles = await Article.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  });
  res.json(articles);
});


app.put("/api/articles/:id/read", async (req, res) => {
  const { id } = req.params;
  const { isRead } = req.body;

  const article = await Article.findByIdAndUpdate(id, { isRead }, { new: true });
  if (!article) return res.status(404).json({ error: "Article not found" });

  res.json(article);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
