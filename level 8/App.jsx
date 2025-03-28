import { useState, useEffect } from "react";
import "./App.css";

function fetchData(callback) {
    setTimeout(() => {
        const mockData = [
            { id: 1, name: "Barnika" },
            { id: 2, name: "Santhiya" },
            { id: 3, name: "Abidha shree" }
        ];
        callback(mockData);
    }, 2000);
}

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(setData);
    }, []);

    return (
      <div className="container">
      <h2>Fetched Data</h2>
      <div className="data-container">
          <ul className="data-list">
              {data.map((item) => (
                  <li key={item.id} className="data-item">{item.name}</li>
              ))}
          </ul>
      </div>
  </div>
  
    );
}

export default App;
