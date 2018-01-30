import React from 'react';

export default class TrainingProgramForm extends React.Component {

    state = {
        name: '',
        startDate: '',
        endDate: '',
        maxAttendance: ''
    }

    change = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name !== '' && this.state.startDate !== '' && this.state.endDate !== '' && this.state.maxAttendance !== '') {
            fetch("http://bangazon.com:5000/api/trainingProgram", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            })
                .then(res => console.log(res.json()))
                .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        name: '',
                        startDate: '',
                        endDate: '',
                        maxAttendance: ''
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                        name: '',
                        startDate: '',
                        endDate: '',
                        maxAttendance: ''
                    });
                }
                )
        } else {
            alert('Form invalid');
        }
    }

    render() {
        return (

            <form>
                <input
                    name='name'
                    placeholder='Program Name'
                    type='text'
                    value={this.state.name}
                    onChange={e => this.change(e)} />
                <br />
                <input
                    name='startDate'
                    placeholder='Start Date'
                    value={this.state.startDate}
                    onChange={e => this.change(e)} />
                <br />
                <input
                    name='endDate'
                    placeholder='End Date'
                    value={this.state.endDate}
                    onChange={e => this.change(e)} />
                <br />
                <input
                    name='maxAttendance'
                    placeholder='Maximum Attendance'
                    value={this.state.maxAttendance}
                    onChange={e => this.change(e)} />

                <br />
                <button onClick={e => this.onSubmit(e)}>Submit</button>
            </form>
        );
    }

}

