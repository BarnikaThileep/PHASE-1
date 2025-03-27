import './App.css';
import React from "react";

const Greeting = ({ message = "Hello, World!" }) => {
  return <h1>{message}</h1>;
};

export default Greeting;
