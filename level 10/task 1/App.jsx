import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import "./App.css"; // Global styles

const App = () => {
  const [weather, setWeather] = useState(null);

  return (
    <div className="app-container">
      <h1>🌍 Weather Forecast App</h1>
      <SearchBar setWeather={setWeather} />
      {weather && <CurrentWeather weather={weather} />}
    </div>
  );
};

export default App;

Currentweather.jsx
import React from "react";

const CurrentWeather = ({ weather }) => {
  if (!weather) return <p>No weather data available</p>;

  return (
    <div className="weather-container">
      <h2>Weather in {weather.name}, {weather.sys.country}</h2>
      <p>🌡 Temperature: {weather.main.temp}°C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
      <p>⛅ Condition: {weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt="Weather icon"
      />
    </div>
  );
};

export default CurrentWeather;
Forecastlist.jsx
const ForecastList = ({ weather }) => {
    if (!weather) return null;
  
    return (
      <div className="p-4 mt-4 bg-gray-100 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Next 5 Days Forecast</h2>
        <div className="grid grid-cols-2 gap-4">
          {weather.list.slice(0, 5).map((day, index) => (
            <div key={index} className="p-2 bg-white rounded shadow text-center">
              <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
              <p className="text-xl">{day.main.temp}°C</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ForecastList;
Searchbar.jsx

import React, { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY; // Load API Key from .env

const SearchBar = ({ setWeather }) => {
  const [city, setCity] = useState("");

  const fetchWeather = async () => {
    if (!city) return alert("Please enter a city name.");

    try {
      console.log("Fetching weather for:", city);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      console.log("API Response:", data); // Debugging log

      if (data.cod === 200) {
        setWeather(data);
        setCity(""); // Clear input field after search
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>
    </div>
  );
};

export default SearchBar;

.env
VITE_API_KEY=fc3ae9c8edf20bff482c3982c81ff49a

weatherApi.js

import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY; // Get API key from .env
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeatherData = async (city) => {
  try {
    const res = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
