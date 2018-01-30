import React from 'react';
import './index.css';

export default class TrainingProgramListItem extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            showDetail: false,
            name: this.props.name
        }

    }
    
    // this function will either show the details or hide them
    toggleDetail = () => {
        if (this.state.showDetail) {
            this.setState({
                showDetail: false,
            })
        } else {
            this.setState({
                showDetail: true,
            })
        }
    }

    render() {
        return (
            <div>
                <span className="trainingProgramListItem" onClick={this.toggleDetail}>{this.state.name}</span>
                {this.state.showDetail ? <DetailStub /> : null}
            </div>
        );
    }

}

class DetailStub extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {

        }
    }

    render() {
        return (
            <div>Hello World!</div>
        ) 
    }

}