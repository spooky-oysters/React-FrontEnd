import React, { Component } from 'react';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            id: this.props.id,
            response: ''
        };
    }

    componentDidMount() {
        const id = this.state.id
        fetch(`http://bangazon.com:5000/api/trainingprogram/${id}`)
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            )
    }

    deleteTrainingProgram = id => {
        fetch(`http://bangazon.com:5000/api/trainingprogram/${id}`, {method: 'delete'})
            .then(res => {
                this.setState({
                    response: res.ok ? 'Training Program Deleted' : 'Training Program could not be deleted'
                })
                return res.json();
            })
            .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result,
                });
                this.props.removeItem(id);
               
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            )
    }


    render() {
        const { error, isLoaded, items, id, response } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let startDate = (new Date(this.state.items.startDate)).toLocaleString();
            let endDate = (new Date(this.state.items.endDate)).toLocaleString();
            return (
                <div className="Detail">
                    <p>Start Date: {startDate}</p> 
                    <p>End Date: {endDate}</p> 
                    <p>Max Attendance: {items.maxAttendance} people</p> 

                    <button onClick={() => this.deleteTrainingProgram(id)}>
                        Delete
                    </button>

                    <div>{response}</div>
                    
                </div>
            );
        }
    }
}


export default Detail;
