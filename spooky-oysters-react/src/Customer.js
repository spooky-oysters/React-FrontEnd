import React from 'react';
import './index.css';
import {Modal, Collapsible, CollapsibleItem, Row, Col, Container, Button, Input} from 'react-materialize';

export default class CustomerComponent extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            
        }

    }
    
    // Methods to handle the buttons
    onClickList = () => {
        this.setState ({
            showList: true,
            showNew: false
        });
        
    }

    onClickForm = () => {
        this.setState ({
            showList: false,
            showNew: true
        });
        
    }

    onClickCollapseAll = () => {
        this.setState ({
            showList: false,
            showNew: false
        })
    }

    /*
        In the render method we will display 3 buttons and toggle
        the display between a form view and a list view. The buttons
        will dictate which view is show the list view or the form view
    */
    render() {
        return(
        <section className="component">
        <h1>Customers</h1>
        <Button onClick={this.onClickList}>List Customers</Button>
        <Modal
                header='Add a Customer'
                trigger={<Button onClick={this.onClickForm}>Add New Customer</Button>}>
                <CustomerForm onClickCollapseAll={this.onClickCollapseAll}/>
            </Modal>
        <Button onClick={this.onClickCollapseAll}>Collapse</Button>
        { this.state.showList ? <CustomerList /> : null}
        { this.state.showNew ? <CustomerForm /> : null}
        </section>
        );
    }

}

class CustomerList extends React.Component {
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
        eventually called by the CustomerListItemDetail component. This will 
        update the state of the list to remove an item once it
        has been removed.
      */
      removeItem = (id) => {
        // copy the current state of items
        let listItems = this.state.items.slice();
        // find the index of the training program to remove
        let itemIndex = listItems.findIndex(i=> i.customerId === id);
        // remove the item from the array
        listItems.splice(itemIndex,1);
        // update the state of items in the list component
        this.setState({items: listItems});
      }
  
      componentDidMount () {
        fetch("http://bangazon.com:5000/api/customer")
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
            <Container>
            <Row>
              <Col s={8} className='offset-s2'>
                {items.map(item => (
                <Collapsible popout defaultActiveKey={1} key={item.customerId}>
                  <CollapsibleItem header={`${item.firstName} ${item.lastName}`} id={item.customerId}>
                  
                  <CustomerListItem 
                  firstName={item.firstName} 
                  lastName={item.lastName}
                  lastLogin={item.lastLoginDate}
                  id={item.customerId}
                  removeItem={this.removeItem}  
                />
                  
                  </CollapsibleItem>
                </Collapsible>
                  ))}
              </Col>
            </Row>
          </Container>
          );
        }
      }

}

class CustomerListItem extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            showDetail: true,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
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
                {this.state.showDetail ? <CustomerListItemDetail id={this.state.id} removeItem={this.props.removeItem}/> : null}
            </div>
        );
    }

}

class CustomerListItemDetail extends React.Component {
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
        fetch(`http://bangazon.com:5000/api/customer/${id}`)
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
        const { error, isLoaded, items, response } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let creationDate = (new Date(this.state.items.creationDate)).toLocaleString();
            let lastLoginDate = (new Date(this.state.items.lastLoginDate)).toLocaleString();
            return (
                <div className="Detail">
                    <p>Customer Since: {creationDate}</p> 
                    <p>Last Login Date: {lastLoginDate}</p> 
                    <p>CustomerId: {items.customerId}</p> 


                    <div>{response}</div>
                    
                </div>
            );
        }
    }

}

class CustomerForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        lastLoginDate: Date.Now,
        response: '',
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
        fetch("http://bangazon.com:5000/api/customer", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res)
            .then(
            (result) => {
                this.setState({
                    firstName: '',
                    lastName: '',
                    lastLoginDate: Date.Now,
                    response: result.ok ? 'New Customer Created' : 'Error, retry submission'
                });
                
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    response: '',
                    error
                });
            }
            )
    }

    render() {
        return (

                <Row>
                <Col s={12}>
                <form>
                    <Row>
                    <Input
                        name='firstName'
                        placeholder='First Name'
                        type='text'
                        required
                        value={this.state.firstName}
                        onChange={e => this.change(e)} />

                    </Row>
                    <Row>
                    <Input
                        name='lastName'
                        placeholder='Last Name'
                        type='text'
                        required
                        value={this.state.lastName}
                        onChange={e => this.change(e)} />

                   </Row>
                    <button onClick={e => this.onSubmit(e)}>Submit</button>
                </form>
                <div>{this.state.response}</div>
                </Col>  
                </Row>


        );
    }
}