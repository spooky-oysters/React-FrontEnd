import React from 'react';
import './index.css';
import Detail from './Detail.js';

export default class TrainingProgramListItem extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            showDetail: true,
            name: this.props.name,
            id: this.props.id
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
                {/* <span className="listItem" onClick={this.toggleDetail}>{this.state.name}</span> */}
                {this.state.showDetail ? <Detail id={this.state.id} removeItem={this.props.removeItem}/> : null}
            </div>
        );
    }

}
