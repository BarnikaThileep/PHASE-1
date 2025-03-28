import React, { useState } from "react";
import "./App.css";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);
  const reset = () => setCount(initialValue);

  return [count, increment, decrement, reset];
}

function CounterComponent() {
  const [count, increment, decrement, reset] = useCounter(0);

  return (
    <div className="counter-container">
      <h2 className="counter-value">Count: {count}</h2>
      <button className="counter-button" onClick={increment}>Increment</button>
      <button className="counter-button" onClick={decrement}>Decrement</button>
      <button className="counter-button reset" onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterComponent;
