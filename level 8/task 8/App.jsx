import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 

const MultiAPIComponent = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/users"),
          axios.get("https://jsonplaceholder.typicode.com/posts"),
        ]);

        setUsers(usersResponse.data);
        setPosts(postsResponse.data.slice(0, 10)); // Show only first 10 posts
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Fetched Users and Posts</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="data-container">
          <div className="users">
            <h3>Users</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id} className="user-item">
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>

          <div className="posts">
            <h3>Posts</h3>
            <ul>
              {posts.map((post) => (
                <li key={post.id} className="post-item">
                  <strong>{post.title}</strong>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <MultiAPIComponent />
    </div>
  );
};

export default App;
