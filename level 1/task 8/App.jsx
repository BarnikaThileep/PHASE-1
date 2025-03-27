import React from 'react';
import './App.css';


const UserRoleMessage = ({ role, username }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {role === 'admin' ? (
          <h2 style={styles.adminText}>
            Welcome, Admin {username}! 🔥 You have full access.
          </h2>
        ) : role === 'user' ? (
          <h2 style={styles.userText}>
            Hello, {username}! 😊 You have limited access.
          </h2>
        ) : (
          <h2 style={styles.guestText}>
            Welcome, Guest! Please log in to continue.
          </h2>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full height of the screen
    width: '100vw', // Full width of the screen
    backgroundColor: 'lightgreen',
  },
  container: {
    padding: '40px',
    textAlign: 'center',
    borderRadius: '30px',
    backgroundColor: 'lightblue',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '300px',
  },
  adminText: { color: 'red' },
  userText: { color: 'blue' },
  guestText: { color: 'gray' },
};

export default UserRoleMessage;

