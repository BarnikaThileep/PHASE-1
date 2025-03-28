import { useState } from "react";
import "./App.css";

const LiveInput = () => {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <h1>Displaying the input</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-field"
        placeholder="Type something..."
      />
      <p className="output-text">{text}</p>
    </div>
  );
};

export default LiveInput;
