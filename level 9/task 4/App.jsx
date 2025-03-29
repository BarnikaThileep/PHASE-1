import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (username, email) => {
    setUser({ username, email });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated }) =>
        isAuthenticated ? children : <Navigate to="/login" />
      }
    </AuthContext.Consumer>
  );
};

const Home = () => <h2>Home Page (Public)</h2>;

const Dashboard = () => (
  <AuthContext.Consumer>
    {({ isAuthenticated, user }) => (
      <div>
        <h2>Dashboard (Protected)</h2>
        {isAuthenticated ? (
          <p>Welcome, {user.username}! You have successfully logged in.</p>
        ) : (
          <p>You need to log in to access the dashboard.</p>
        )}
      </div>
    )}
  </AuthContext.Consumer>
);

const Profile = () => <h2>Profile (Protected)</h2>;

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <AuthContext.Consumer>
      {({ login }) => (
        <div>
          <h2>Login Page</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button onClick={() => {
            login(username, email);
            setMessage("Login Successfully");
          }}>Login</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </AuthContext.Consumer>
  );
};

const Navbar = () => {
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, logout }) => (
        <nav>
          <a href="/">Home</a> | <a href="/dashboard">Dashboard</a> | <a href="/profile">Profile</a>
          {isAuthenticated && <button onClick={logout}>Logout</button>}
        </nav>
      )}
    </AuthContext.Consumer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
