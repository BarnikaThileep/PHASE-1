import React, { useState, useEffect, memo } from "react";


const LargeList = memo(({ items }) => {
  console.log("Rendering LargeList");
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}, (prevProps, nextProps) =>{
  return JSON.stringify(prevProps.items) === JSON.stringify(nextProps.items);
});


const App = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(
    Array.from({ length: 1000 }, (_, i) => ({ id: i, text: `Item ${i}` }))
  );

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Optimized Large List</h2>
      <p>Counter (Changes Every Second): {count}</p>
      <LargeList items={items} />
    </div>
  );
};

export default App;
