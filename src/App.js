import React, { Component } from 'react';
import Stories from "./components/Stories";
import Users from "./components/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Stories/>
          <Users />
      </div>
    );
  }
}

export default App;
