import React, { useState, useEffect } from "react";
import "./App.css"; // Import CSS

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        
        // Add delay before setting data
        setTimeout(() => {
          setData(result);
          setLoading(false);
        }, 2000); // 2-second delay

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

function DataFetcher() {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts/1"); 

  return (
    <div className="container">
      <h2>Data Fetcher</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {data && (
        <div className="data-box">
          <h3 className="data-title">{data.title}</h3>
          <p className="data-body">{data.body}</p>
        </div>
      )}
    </div>
  );
}

export default DataFetcher;
