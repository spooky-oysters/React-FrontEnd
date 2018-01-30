import React from 'react';
import './index.css';
import TrainingProgramList from './TrainingProgramList.js';
import TrainingProgramForm from './trainingProgramForm.js';
import {Button, Modal, Dropdown} from 'react-materialize';

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

            <Button onClick={this.onClickList}>List Programs</Button>

            <Modal
                header='Add a Training Program'
                trigger={<Button onClick={this.onClickForm}>Add New</Button>}>
                <TrainingProgramForm />
            </Modal>
            
            <Button onClick={this.onClickCollapseAll}>Collapse</Button>

            { this.state.showList ? <TrainingProgramList /> : null}
            { this.state.showNew ? <TrainingProgramForm /> : null}
            
            </section>
        );
    }    

}