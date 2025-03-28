import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});


let requestCount = 0;
const updateLoadingState = (isLoading) => {
  const event = new CustomEvent("loading", { detail: isLoading });
  window.dispatchEvent(event);
};


api.interceptors.request.use(
  (config) => {
    requestCount++;
    updateLoadingState(true);
    config.headers.Authorization = "Bearer your-token-here";
    return config;
  },
  (error) => {
    requestCount--;
    if (requestCount === 0) updateLoadingState(false);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    requestCount--;
    if (requestCount === 0) updateLoadingState(false);
    console.log("Response:", response);
    return response;
  },
  (error) => {
    requestCount--;
    if (requestCount === 0) updateLoadingState(false);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert("Unauthorized! Please log in.");
          break;
        case 404:
          alert("Resource not found.");
          break;
        case 500:
          alert("Server error! Please try again later.");
          break;
        default:
          alert("An error occurred. Please try again.");
      }
    } else {
      alert("Network error. Check your connection.");
    }
    return Promise.reject(error);
  }
);


const LoadingIndicator = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLoading = (event) => setLoading(event.detail);
    window.addEventListener("loading", handleLoading);
    return () => window.removeEventListener("loading", handleLoading);
  }, []);

  return loading ? <div className="loading-indicator">Loading...</div> : null;
};


const DataFetcher = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data.slice(0, 10)); // Get first 10 posts
      } catch (err) {
        setError("Error fetching data.");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2>Fetched Posts</h2>
      {error && <p className="error">{error}</p>}
      {!error && (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


const App = () => {
  return (
    <div>
      <LoadingIndicator />
      <DataFetcher />
    </div>
  );
};

export default App;
