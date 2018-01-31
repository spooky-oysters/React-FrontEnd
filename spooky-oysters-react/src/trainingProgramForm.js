import React from 'react';
import {Row, Col, Button, Input} from 'react-materialize';
import './index.css';

export default class TrainingProgramForm extends React.Component {

    state = {
        name: '',
        startDate: '',
        endDate: '',
        maxAttendance: '',
        response: ''
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        fetch("http://bangazon.com:5000/api/trainingProgram", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(this.state)
            })
            .then((res) => {
                this.setState({
                    isLoaded: true,
                    name: '',
                    startDate: '',
                    endDate: '',
                    maxAttendance: '',  
                    response: res.ok ? 'New Training Program Created': 'Error, Retry Submission'
            })
                this.props.onClickCollapseAll();
            }, (error) => {
                this.setState({isLoaded: true, response: '', error});
            })
            }

    render() {
        return (

            <div>
                <Row>
                    <Col s={12}>
                    <Row>
                        <Input                             
                            name='name'
                            label='Program Name'
                            type='text'
                            required
                            value={this.state.name}
                            onChange={e => this.change(e)}/>
                        </Row>
                        <Row>
                        <Input 
                            className='add_width'
                            name='startDate'
                            label='Start Date'
                            type='date'
                            required
                            value={this.state.startDate}
                            onChange={e => this.change(e)}/>
                        </Row>
                        <Row>
                        <Input
                            className='add_width'
                            name='endDate'
                            label='End Date'
                            type='date'
                            required
                            value={this.state.endDate}
                            onChange={e => this.change(e)}/>
                        </Row>
                        <Row>
                        <Input
                            className='add_width'
                            name='maxAttendance'
                            label='Maximum Attendance'
                            type='text'
                            required
                            value={this.state.maxAttendance}
                            onChange={e => this.change(e)}/>
                        </Row>
                        <Button onClick={e => this.onSubmit(e)}>Submit</Button>
                    </Col>
                    <div>{this.state.response}</div>
                </Row>
            </div>

        );
    }

}
