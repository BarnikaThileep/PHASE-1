import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "36431db3"; 
const API_URL = "https://www.omdbapi.com/";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL, {
          params: {
            apikey: API_KEY,
            s: searchTerm,
          },
        });
        if (response.data.Response === "True") {
          setMovies(response.data.Search);
        } else {
          setError(response.data.Error);
          setMovies([]);
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      }
      setLoading(false);
    };

    const delayDebounce = setTimeout(fetchMovies, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="movie-search-container">
      <h1>Movie Database Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
            <h3>{movie.Title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
