import React, { useState } from "react";

const Counter = () => {
  // State to store counter value
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", marginBottom: "100px",marginLeft:"550px" }}>
      <h1>Counter: {count}</h1>
      <button 
        onClick={() => setCount(count + 1)} 
        style={{ margin: "5px", padding: "10px", fontSize: "16px" }}
      >
        Increment
      </button>
      <button 
        onClick={() => setCount(count - 1)} 
        style={{ margin: "5px", padding: "10px", fontSize: "16px" }}
      >
        Decrement
      </button>
    </div>
  );
};

export default Counter;
App.jsx
import React from "react";
import UserDetails from "./UserDetails";

const App = () => {
  return (
    <div>
      <UserDetails />
    </div>
  );
};

export default App;
