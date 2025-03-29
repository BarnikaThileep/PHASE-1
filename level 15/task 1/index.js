import mongoose from "mongoose";
import dotenv from "dotenv";
import fetch from "node-fetch";
import express from "express";

dotenv.config();

if (!process.env.WEATHER_API_KEY) {
    console.error("❌ Missing API key! Check your .env file.");
    process.exit(1); // Exit the program
}

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const API_KEY = process.env.WEATHER_API_KEY;
const CITY = "New York";

console.log("Loaded API Key:", API_KEY);


const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  weather: String,
  timestamp: { type: Date, default: Date.now },
});

const Weather = mongoose.model("Weather", weatherSchema);


async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}
connectDB();


async function fetchWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;    
    console.log("Fetching weather from:", url);

    const response = await fetch(url);
    const data = await response.json();
    console.log("Response:", data);

    if (data.cod !== 200) {
      throw new Error(data.message); // Handle API errors
    }

    const weatherEntry = new Weather({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      weather: data.weather[0].description,
    });
    await weatherEntry.save();
    console.log("✅ Weather data saved successfully");
  } catch (error) {
    console.error("❌ Error fetching weather data:", error.message);
  }
}


setInterval(fetchWeather, 60 * 60 * 1000);
fetchWeather();


app.get("/weather", async (req, res) => {
  try {
    const weatherData = await Weather.find().sort({ timestamp: -1 });
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve weather data" });
  }
});

app.get("/weather/average", async (req, res) => {
  try {
    const { start, end } = req.query;
    const startDate = new Date(start);
    const endDate = new Date(end);

    const result = await Weather.aggregate([
      { $match: { timestamp: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: null, avgTemp: { $avg: "$temperature" } } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate average temperature" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
