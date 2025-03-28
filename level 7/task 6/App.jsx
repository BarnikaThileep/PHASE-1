import React, { useState, useEffect } from "react";
import "./App.css"; 


function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]); 
}


function TitleChanger() {
  const [count, setCount] = useState(0);


  useDocumentTitle(`Count: ${count}`);

  return (
    <div className="container">
      <h2>Dynamic Document Title</h2>
      <p className="count-text">Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}

export default TitleChanger;
