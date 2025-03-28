import React, { useState, useEffect } from "react";
import "./App.css";

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const WindowSizeDisplay = () => {
  const { width, height } = useWindowResize();

  return (
    <div className="window-size-container">
      <h2>Window Dimensions</h2>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};

export default WindowSizeDisplay;
