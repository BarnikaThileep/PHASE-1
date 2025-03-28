import React, { useState, useEffect } from "react";
import "./App.css"; // Import CSS

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function PersistentComponent() {
  const [text, setText] = useLocalStorage("userInput", "");
  const [count, setCount] = useLocalStorage("counter", 0);

  return (
    <div className="container">
      <h2>Persistent Input</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        className="input-field"
      />
      <p className="stored-value">Stored Value: {text}</p>

      
      
    </div>
  );
}

export default PersistentComponent;
