import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Detail from './Detail.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bangazon API Consumer</h1>
        </header>
        
        <Detail />
      </div>
    );
  }
}

export default App;
