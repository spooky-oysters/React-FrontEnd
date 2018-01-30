import React, { Component } from 'react';
import './App.css';
import TrainingProgramForm from './trainingProgramForm.js';
import TrainingProgram from './TrainingProgram.js';


class App extends Component {

  render() {
    return (
      <div className="App">

        <TrainingProgramForm />

        <TrainingProgram />
      </div>
    );
  }
}

export default App;
