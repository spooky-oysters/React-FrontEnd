import React from 'react';

export default class TrainingProgramForm extends React.Component {
    state = {
        name: '',
        startDate: '',
        endDate: '',
        maxAttendance: ''
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (

            <form>
                <input 
                name='name'
                placeholder='Program Name' 
                value={this.state.name} 
                onChange={e => this.change(e)}/>
                <br/>
                <input 
                name='startDate'
                placeholder='Start Date' 
                value={this.state.startDate} 
                onChange={e => this.change(e)}/>
                <br/>
                <input 
                name='endDate'
                placeholder='End Date' 
                value={this.state.endDate} 
                onChange={e => this.change(e)}/>
                <br/>
                <input 
                name='maxAttendance'
                placeholder='Maximum Attendance' 
                value={this.state.maxAttendance} 
                onChange={e => this.change(e)}/>

                <br/>
                <button onClick={(e) => this.onSubmit(e)}>Submit</button>

            </form>
        );
    }

}

