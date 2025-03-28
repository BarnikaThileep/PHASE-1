import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";


const cache = new Map();

const useAxios = (url, config = {}, forceRefresh = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      
      if (!forceRefresh && cache.has(url)) {
        setData(cache.get(url));
        setLoading(false);
        return;
      }

      
      controllerRef.current = new AbortController();
      const signal = controllerRef.current.signal;

      try {
        const response = await axios.get(url, { ...config, signal });
        cache.set(url, response.data); // Cache the response
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort(); 
      }
    };
  }, [url, config, forceRefresh]);

  
  const refreshData = () => {
    cache.delete(url);
    setData(null);
    setLoading(true);
  };

  return { data, loading, error, refreshData };
};

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const App = () => {
  const [forceRefresh, setForceRefresh] = useState(false);
  const { data, loading, error, refreshData } = useAxios(API_URL, {}, forceRefresh);

  return (
    <div className="container">
      <h2>Axios Custom Hook with Caching</h2>
      <button onClick={() => setForceRefresh(!forceRefresh)}>Force Refresh</button>
      <button onClick={refreshData}>Manual Refresh</button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="post-list">
        {data && data.slice(0, 5).map((post) => (
          <li key={post.id} className="post-item">
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
