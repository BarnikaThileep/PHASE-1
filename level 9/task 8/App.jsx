import React from "react";
import { FixedSizeList as List } from "react-window";
import "./App.css"; 


const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

const Row = ({ index, style }) => (
  <div className="list-item" style={style}>
    {items[index]}
  </div>
);

const VirtualizedList = () => {
  return (
    <div className="container">
      <h1>Virtualized List (10,000 Items)</h1>
      <List
        height={400} // Viewport height
        itemCount={items.length} // Total number of items
        itemSize={35} // Fixed height per row (adjust as needed)
        width={"100%"} // Responsive width
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedList;
