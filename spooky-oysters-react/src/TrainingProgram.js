import React from 'react';
import './index.css';
import TrainingProgramList from './TrainingProgramList.js';
import TrainingProgramForm from './TrainingProgramForm.js';

export default class TrainingProgram extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            showList: false,
            showNew:false
        }

    }
    
    // Methods to handle the buttons
    onClickList = () => {
        this.setState ({
            showList: true,
            showNew: false
        });
        
    }

    onClickForm = () => {
        this.setState ({
            showList: false,
            showNew: true
        });
        
    }

    onClickCollapseAll = () => {
        this.setState ({
            showList: false,
            showNew: false
        })
    }

    render() {
        return(
        <section className="trainingProgramComponent">
        <h1>Training Programs</h1>
        <button onClick={this.onClickList}>List Programs</button>
        <button onClick={this.onClickForm}>Add New</button>
        <button onClick={this.onClickCollapseAll}>Collapse</button>
        { this.state.showList ? <TrainingProgramList /> : null}
        { this.state.showForm ? <TrainingProgramForm /> : null}
        </section>
        );
    }

}