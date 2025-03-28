import { useState } from "react";
import "./App.css";

const Toggle = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="container">
      <div className="toggle-box">
        <button onClick={() => setIsVisible(!isVisible)} className="toggle-btn">
          {isVisible ? "Hide Content" : "Show Content"}
        </button>
        {isVisible && <p className="content">Hello!!!!! I'm Barnika L T pursuing B.Tech IT in SNS College Of Engineering.</p>}
      </div>
    </div>
  );
};

export default Toggle;
