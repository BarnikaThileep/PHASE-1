import React, { useState } from "react";
import "./App.css";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };

  return [value, toggle];
}

function ToggleComponent() {
  const [isVisible, toggleVisibility] = useToggle();

  return (
    <div className="toggle-container">
      <button className="toggle-button" onClick={toggleVisibility}>Toggle Content</button>
      {isVisible && <p className="toggle-content">Hello Everyone !!!!! This is Barnika L T</p>}
    </div>
  );
}

export default ToggleComponent;
