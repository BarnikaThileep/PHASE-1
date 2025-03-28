import React, { useState, useRef } from "react";
import "./App.css";

function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return { value, onChange: handleChange, ref: inputRef };
}

function InputComponent() {
  const inputProps = useInput("");

  return (
    <div className="input-container">
      <input className="input-field" type="text" {...inputProps} />
      <p className="input-value">Entered Text: {inputProps.value}</p>
    </div>
  );
}

export default InputComponent;
