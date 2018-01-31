import React, { Component } from 'react';
import './App.css';
import TrainingProgram from './TrainingProgram.js';
import Customer from './Customer.js';


class App extends Component {

  render() {
    return (
      <div className="App">
        <TrainingProgram />
        <Customer />
      </div>
    );
  }
}

export default App;
