import { useState, useEffect } from "react";
import "./App.css"; 

const fetchUsersPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Alice Johnson" },
        { id: 2, name: "Bob Smith" },
        { id: 3, name: "Charlie Brown" }
      ]);
    }, 2000);
  });
};

const FetchComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsersAsync = async () => {
    try {
      const result = await fetchUsersPromise();
      setUsers(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAsync();
  }, []);

  return (
    <div className="container">
      {loading && <p className="loading">Loading users...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchComponent;
