import './App.css';

import React from "react";

const ItemList = () => {
  const items = ["Paris", "Maldives", "Switzerland", "Dubai",];

  return (
    <div className="container">
      <h2>Bucket List</h2>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="list-item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
