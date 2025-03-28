import React, { useState, useEffect } from "react";
import "./App.css";

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const failure = (err) => {
      setError(err.message || "Unable to retrieve location.");
    };

    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  return { location, error };
};

const GeolocationComponent = () => {
  const { location, error } = useGeolocation();

  return (
    <div className="geo-container">
      <h2>User Location</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : location ? (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;
