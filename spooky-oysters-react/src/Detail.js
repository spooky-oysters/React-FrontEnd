import React, { Component } from 'react';
import logo from './logo.svg';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://bangazon.com:5000/api/trainingprogram/1")
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
            return (
                <div className="Detail">
                    <header className="Detail-header">

                        <h1 className="Detail-title">Training Program Detail</h1>
                    </header>
                    <p className="Detail-intro">
                        Here we will display the details for a training program.
                    </p>
                    <div>
                    <h2>{items.name}, 
                    </div>
                </div>
            );
        }
    }
}


export default Detail;
