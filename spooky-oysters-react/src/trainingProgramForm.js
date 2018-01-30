import React from 'react';
import {Row, Col, Button} from 'react-materialize';

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
            .then(res => res)
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    name: '',
                    startDate: '',
                    endDate: '',
                    maxAttendance: '',
                    response: result.ok
                        ? 'New Training Program Created'
                        : 'Error, retry submission'
                });

            }, (error) => {
                this.setState({isLoaded: true, response: '', error});
            })
    }

    render() {
        return (

            <div>
                <Row>
                    <Col s={12} className='grid-example'>
                        <input
                            name='name'
                            placeholder='Program Name'
                            type='text'
                            required
                            value={this.state.name}
                            onChange={e => this.change(e)}/>
                        <br/>
                        <input
                            name='startDate'
                            placeholder='Start Date'
                            type='date'
                            required
                            value={this.state.startDate}
                            onChange={e => this.change(e)}/>
                        <br/>
                        <input
                            name='endDate'
                            placeholder='End Date'
                            type='date'
                            required
                            value={this.state.endDate}
                            onChange={e => this.change(e)}/>
                        <br/>
                        <input
                            name='maxAttendance'
                            placeholder='Maximum Attendance'
                            type='text'
                            required
                            value={this.state.maxAttendance}
                            onChange={e => this.change(e)}/>

                        <br/>
                        <Button onClick={e => this.onSubmit(e)}>Submit</Button>
                    </Col>
                    <div>{this.state.response}</div>
                </Row>
            </div>

        );
    }

}
