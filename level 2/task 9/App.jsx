import './App.css',
import { useState } from "react"

export default function DynamicInput() {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-box"
      />
      <p className="display-text">{text}</p>
    </div>
  );
}
