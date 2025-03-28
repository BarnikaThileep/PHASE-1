import React, { useRef } from "react";
import './App.css'

const InputFocus = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something..."
        className="input-box"
      />
      <button onClick={handleFocus} className="focus-button">
        Focus Input
      </button>
    </div>
  );
};

export default InputFocus;
