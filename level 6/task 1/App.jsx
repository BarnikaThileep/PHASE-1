import { useState } from "react";
import "./App.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="counter-box">
        <h1>Counter: {count}</h1>
        <div className="buttons">
          <button onClick={() => setCount(count + 1)} className="increment">
            Increment
          </button>
          <button onClick={() => setCount(count - 1)} className="decrement">
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
