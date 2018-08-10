// ./react-redux-client/src/components/App.js
import React from 'react';
import { Navbar,Nav,NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import BuildingForm from './BuildingForm';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.toggleAddBuilding = this.toggleAddBuilding.bind(this);
    this.addBuilding = this.addBuilding.bind(this);
  }

  toggleAddBuilding(e){
    e.preventDefault();
     this.props.mappedToggleAddBuilding();
  }

  addBuilding(e){
      e.preventDefault();
      const form = document.getElementById('addBuildingForm');
      if(form.todoText.value !== ""  && form.todoDesc.value !== ""){
        const data = new FormData();
        data.append('todoText', form.todoText.value);
        data.append('todoDesc', form.todoDesc.value);
        data.append('buildingType', form.buildingType.value);
        // const data = {
        //   todoText: form.todoText.value,
        //   todoDesc: form.todoDesc.value
        // }
        this.props.mappedAddBuilding(data);
      form.reset();
      }
      else{
        return ;
      }
  }

  render(){
    const appState = this.props.mappedAppState;
    return(
      <div>
      <Navbar inverse  collapseOnSelect className="customNav">
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/#">VOC online</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={{ pathname: '/', query: {  } }}>
           <NavItem eventKey={1}>Koti</NavItem>
        </LinkContainer>
      </Nav>

      <Nav pullRight>
      <LinkContainer to={{ pathname: '/', query: {  } }} onClick={this.toggleAddBuilding}>
         <NavItem eventKey={1}>Lisää uusi rakennus</NavItem>
      </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <div className="container">
  {appState.showAddBuilding &&
    <BuildingForm addBuilding={this.addBuilding} />
  }
  { /* Each Smaller Components */}
   {this.props.children}
  </div>
 </div>
    );
  }
}
