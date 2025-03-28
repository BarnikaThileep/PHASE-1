import { useState, useEffect } from "react";
import "./App.css";

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Timer stopped.");
    };
  }, []);

  return <div className="timer">Time elapsed: {seconds} seconds</div>;
};

const App = () => {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app-container">
      <button className="toggle-button" onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? "Unmount Timer" : "Mount Timer"}
      </button>
      {showTimer && <TimerComponent />}
    </div>
  );
};

export default App;
