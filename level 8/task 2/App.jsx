import { useState, useEffect } from "react";
import "./App.css"; 

function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 1, name: "Barnika", age: 20 };
            resolve(data); // Resolving with mock data
        }, 2000); // 2-second delay
    });
}

function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDataPromise()
            .then((result) => {
                setData(result); // Set state with fetched data
            })
            .catch(() => {
                setError("Error fetching data");
            });
    }, []);

    return (
        <div className="container">
            <h2>Fetched Data</h2>
            {error ? (
                <p className="error">{error}</p>
            ) : data ? (
                <div className="data">
                    <p><strong>ID:</strong> {data.id}</p>
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Age:</strong> {data.age}</p>
                </div>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
}

export default App;
