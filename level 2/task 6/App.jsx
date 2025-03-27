

import React from "react";
import PropTypes from "prop-types";

const UserDetails = ({ name, age, city }) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px", borderRadius: "5px" }}>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>City:</strong> {city}</p>
    </div>
  );
};

// PropTypes validation
UserDetails.propTypes = {
  name: PropTypes.string.isRequired, // Name must be a string
  age: PropTypes.number.isRequired,  // Age must be a number
  city: PropTypes.string.isRequired  // City must be a string
};

export default UserDetails;
APP.jsx
import React from "react";
import UserDetails from "./UserDetails";

const App = () => {
  return (
    <div>
      <h1>Users List</h1>
      <UserDetails name="Alice" age={30} city="Los Angeles" />
      <UserDetails name="Bob" age={time} city="Chicago" /> {/* Incorrect type for age */}
      <UserDetails name="Charlie" age={35} city={true} /> {/* Incorrect type for city */}
    </div>
  );
};

export default App;
