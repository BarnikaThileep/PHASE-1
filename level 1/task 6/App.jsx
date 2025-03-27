import React from 'react';

const Hello = ({ bgColor }) => {
  const divStyle = {
    backgroundColor: bgColor || 'lightyellow', // Default to white if no color is provided
    padding: '100px',
    borderRadius: '50px',
    textAlign: 'center',
    width: '100vw', // Full viewport width
    height: '100vh', // Full viewport height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  };

  return (
    <div style={divStyle}>
      <img src={"barni.jpg"} alt="Barnika's Profile" width="200" />
      <h3>Hello Barnika</h3>
      <p>
        Amiable creative IT initiator pursuing B.Tech IT in SNS College Of Engineering
        currently with a GPA of 9.1.I have completed my SSLC with 99% and HSC with 90%.
      </p>
    </div>
  );
};

export default Hello;

