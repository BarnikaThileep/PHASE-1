import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const CancellableRequestComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          cancelToken: source.token,
        });
        setData(response.data.slice(0, 10)); // Get first 10 posts
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError("Error fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      
      source.cancel("Component unmounted, request canceled.");
    };
  }, []);

  return (
    <div className="container">
      <h2>Fetched Posts</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul className="post-list">
          {data.map((post) => (
            <li key={post.id} className="post-item">
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? "Unmount Component" : "Mount Component"}
      </button>
      {showComponent && <CancellableRequestComponent />}
    </div>
  );
};

export default App;
