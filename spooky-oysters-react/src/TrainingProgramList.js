import React from 'react';
import './index.css';
import ListItem from './ListItem.js';
// import registerServiceWorker from './registerServiceWorker';
export default class TrainingProgramList extends React.Component {
    
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    /*
      This function is passed to the child components and is
      eventually called by the Detail component. This will 
      update the state of the list to remove an item once it
      has been removed.
    */
    removeItem = (id) => {
      // copy the current state of items
      let listItems = this.state.items.slice();
      // find the index of the training program to remove
      let itemIndex = listItems.findIndex(i=> i.trainingProgramId === id);
      // remove the item from the array
      listItems.splice(itemIndex,1);
      // update the state of items in the list component
      this.setState({items: listItems});
    }

    componentDidMount () {
      fetch("http://bangazon.com:5000/api/trainingprogram")
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
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul>
            {items.map(item => (
              <li key={item.trainingProgramId}>
              <ListItem 
                name={item.name} 
                id={item.trainingProgramId}
                removeItem={this.removeItem}  
              />
              </li>
            ))}
          </ul>
        );
      }
    }
  }
