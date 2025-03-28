import { useState } from "react";
import "./App.css";

const LiveInput = () => {
  const [user, setUser] = useState({ name: "", age: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="container">
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        className="input-field"
        placeholder="Enter your name"
      />
      <input
        type="number"
        name="age"
        value={user.age}
        onChange={handleChange}
        className="input-field"
        placeholder="Enter your age"
      />
      <p className="output-text">Name: {user.name}</p>
      <p className="output-text">Age: {user.age}</p>
    </div>
  );
};

export default LiveInput;
