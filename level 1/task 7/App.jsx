import React from 'react';

const StaticList = () => {
  const containerStyle = {
    maxWidth: '600px',
    margin: '100px auto',
    padding: '40px',
    borderRadius: '10px',
    backgroundColor: 'gray',
    boxShadow: '0 4px 8px rgba(145, 135, 135, 0.2)',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h3>My Favorite Programming Languages</h3>
      <ul>
        <li>JavaScript</li>
        <li>Python</li>
        <li>Java</li>
        <li>C++</li>
        <li>TypeScript</li>
      </ul>
    </div>
  );
};

export default StaticList;

