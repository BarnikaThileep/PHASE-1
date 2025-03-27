import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 2, value: "" }
  ]);


  const handleChange = (index, newValue) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, value: newValue } : item))
    );
  };

  const handleSubmit = () => {
    const emptyFields = items.filter((item) => item.value.trim() === "");

    if (emptyFields.length > 0) {
      console.warn("Warning: Some fields are empty. Please fill them before submitting.");
    } else {
      console.log("Form submitted successfully!", items);
    }
  };

  return (
    <div className="app-container">
      <h2>List with Unique Keys & Console Warnings</h2>
      <div className="form-container">
        {items.map((item, index) => (
          <div key={item.id} className="input-group">
            <input type="text" value={item.id} readOnly className="id-input" />
            <input
              type="text"
              placeholder={`Item ${item.id}`} // Placeholder shows Item number
              value={item.value}
              onChange={(e) => handleChange(index, e.target.value)}
              className="text-input"
            />
          </div>
        ))}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
