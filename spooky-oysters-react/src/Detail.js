import React, { Component } from 'react';


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            // id: this.props.id
        };
    }

    componentDidMount() {
        // const id = this.state.id
        fetch("http://bangazon.com:5000/api/trainingprogram/2")
            .then(res => res.json())
            .then(
            (result) => {
                console.log(result)
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


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let startDate = (new Date(this.state.items.startDate)).toLocaleString();
            let endDate = (new Date(this.state.items.endDate)).toLocaleString();
            return (
                <div className="Detail">
                    <header className="Detail-header">
                        <h1>Training Program</h1>
                    </header>
                    <h3>{items.name}</h3>
                    <p>Start Date: {startDate}</p> 
                    <p>End Date: {endDate}</p> 
                    <p>Max Attendance Amount: {items.maxAttendance} people</p> 
                    
                </div>
            );
        }
    }
}


export default Detail;
