import './App.css';

import React, { Component } from 'react';

class HelloComponent extends Component {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
      </div>
    );
  }
}

export default HelloComponent;
App.jsx
import './App.css'
import React from 'react';
import UserRoleMessage from './UserRoleMessage';

const App = () => {
  return (
    <div>
      <UserRoleMessage name="Barnika" />
      <UserRoleMessage />
    </div>
  );
};

export default App;
