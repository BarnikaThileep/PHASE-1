import React, { useState, useCallback } from "react";
import "./App.css";

const ChildComponent = React.memo(({ onIncrement }) => {
  console.log("Child component re-rendered");
  return (
    <button onClick={onIncrement} className="increment-button">
      Increment
    </button>
  );
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div className="container">
      <h1 className="counter">Count: {count}</h1>
      <ChildComponent onIncrement={increment} />
    </div>
  );
};

export default ParentComponent;
