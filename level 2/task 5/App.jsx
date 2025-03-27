import React from "react";
import './App.css';

const UserDetails = ({ name, age, city }) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px", borderRadius: "5px", marginLeft:"600px" }}>
      <h2 style={{textAlign:"center"}}>User Details</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>City:</strong> {city}</p>
    </div>
  );
};

export default UserDetails;
app.jsx
import React from "react";
import UserDetails from "./UserDetails";

const App = () => {
  return (
    <div>
      <h1 style={{textAlign:"center",marginLeft:"600px"}}>Users List</h1>
      <UserDetails name="Barnika" age={20} city="Coimbatore" />
      <UserDetails name="Santhiya" age={21} city="Coimbatore" />
      <UserDetails name="Abidha shree" age={19} city="Coimbatore" />
    </div>
  );
};

export default App;
