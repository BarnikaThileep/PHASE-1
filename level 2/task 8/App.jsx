import React, { useState } from "react";

const ToggleText = () => {
  // State to track visibility
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ textAlign: "center", marginTop: "50px",marginLeft:"650px",marginBottom:"30px",color:"red",fontWeight:"bold" }}>
      <button 
        onClick={() => setIsVisible(!isVisible)}
        style={{ padding: "10px", fontSize: "50px" }}
      >
        {isVisible ? "Hide Text" : "Show Text"}
      </button>

      {/* Conditional Rendering */}
      {isVisible && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
          <p>Suprise!!!! You won 50000</p>
        </div>
      )}
    </div>
  );
};

export default ToggleText;
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
