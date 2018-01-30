import React from 'react';
import './index.css';
import ListItem from './ListItem.js';
import Collapsible from 'react-materialize';
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
  
    componentDidMount() {
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
  

//     <Collapsible>
// 	<CollapsibleItem header='First' icon='filter_drama'>
// 		Lorem ipsum dolor sit amet.
// 	</CollapsibleItem>
// 	<CollapsibleItem header='Second' icon='place'>
// 		Lorem ipsum dolor sit amet.
// 	</CollapsibleItem>
// 	<CollapsibleItem header='Third' icon='whatshot'>
// 		Lorem ipsum dolor sit amet.
// 	</CollapsibleItem>
// </Collapsible>

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
  //             <Collapsible>
  //             <CollapsibleItem header='First' icon='filter_drama'>
	// 	Lorem ipsum dolor sit amet.
	// </CollapsibleItem>
              <li key={item.trainingProgramId}>
              <ListItem name={item.name} id={item.trainingProgramId}/>
              </li>
            ))}
          </ul>
        );
      }
    }
  }
