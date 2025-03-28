import React, { useReducer } from "react";
import "./App.css";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="container">
      <h1 className="counter">Counter: {state.count}</h1>
      <div className="button-group">
        <button onClick={() => dispatch({ type: "INCREMENT" })} className="increment">Increment</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })} className="decrement">Decrement</button>
        <button onClick={() => dispatch({ type: "RESET" })} className="reset">Reset</button>
      </div>
    </div>
  );
};
export default Counter;
