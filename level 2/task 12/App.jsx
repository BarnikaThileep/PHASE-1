import './App.css';

import React from "react";

const WelcomeMessage = ({ isLoggedIn }) => {
  return (
    <div className="container">
      <h2>{isLoggedIn ? "Welcome back!" : "Please log in"}</h2>
    </div>
  );
};
