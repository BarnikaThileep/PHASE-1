import React, { useState } from "react";
import "./App.css";

const items = [
  { id: 1, name: "Apple", category: "Fruits" },
  { id: 2, name: "Banana", category: "Fruits" },
  { id: 3, name: "Carrot", category: "Vegetables" },
  { id: 4, name: "Tomato", category: "Vegetables" },
  { id: 5, name: "Chicken", category: "Meat" },
  { id: 6, name: "Muttan", category: "Meat" },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = items.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory)
    );
  });

  return (
    <div className="container">
      <h1>Search & Filter List</h1>

     
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

     
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Meat">Meat</option>
      </select>

     
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <li key={item.id}>{item.name} - {item.category}</li>)
        ) : (
          <p>No items found</p>
        )}
      </ul>
    </div>
  );
};

export default App;
