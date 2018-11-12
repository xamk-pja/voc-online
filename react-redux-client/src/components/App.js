// ./react-redux-client/src/components/App.js
import React from 'react';
import { Navbar, Nav, NavItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import BuildingForm from './BuildingForm';
import Keycloak from 'keycloak-js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAddBuilding = this.toggleAddBuilding.bind(this);
    this.addBuilding = this.addBuilding.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleAddBuilding(e) {
    e.preventDefault();
    this.props.mappedToggleAddBuilding();
  }

  componentDidMount() {
    if (this.props.mappedAppState.kc === null) {
      const keycloak = Keycloak('/keycloak.json');
      keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
        this.props.mappedLoginSuccess({ keycloak: keycloak, authenticated: authenticated });
      });
    }
  }

  logout() {
    const appState = this.props.mappedAppState;
    appState.kc.keycloak.logout();
    this.props.mappedLoginSuccess(null);
  }

  addBuilding(e) {
    e.preventDefault();
    const form = document.getElementById('addBuildingForm');
    if (form.buildingName.value !== "" && form.buildingDesc.value !== "") {
      const data = new FormData();
      data.append('buildingName', form.buildingName.value);
      data.append('buildingAddress', form.buildingAddress.value);
      data.append('buildingCounty', form.buildingCounty.value);
      data.append('buildingOwner', form.buildingOwner.value);
      data.append('buildingYear', form.buildingYear.value);
      data.append('buildingType', form.buildingType.value);
      data.append('buildingMaterial', form.buildingMaterial.value);
      data.append('buildingFloorBase', form.buildingFloorBase.value);
      data.append('buildingRoof', form.buildingRoof.value);
      data.append('buildingWarmingSystem', form.buildingWarmingSystem.value);
      data.append('buildingFloorsNumber', form.buildingFloorsNumber.value);
      data.append('buildingDesc', form.buildingDesc.value);

      this.props.mappedAddBuilding(data);
      form.reset();
    }
    else {
      return;
    }
  }

  render() {
    const appState = this.props.mappedAppState;

    return (
      <div>
        {appState.kc && appState.kc.authenticated &&
          <Navbar inverse collapseOnSelect className="customNav">
            <Navbar.Header>
              <Navbar.Brand>
                <LinkContainer to="/">
                  <span>VOC online</span>
                </LinkContainer>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer to={{ pathname: '/', query: {} }} onClick={this.toggleAddBuilding}>
                  <NavItem eventKey={1}>Lisää uusi rakennus</NavItem>
                </LinkContainer>
              </Nav>
              <Nav pullRight>
                <NavItem onClick={this.logout} eventKey={2}>Kirjaudu ulos</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        }
        {appState.kc && appState.kc.authenticated &&
          <div className="container">
            {appState.showAddBuilding &&
              <BuildingForm addBuilding={this.addBuilding} />
            }
            { /* Each Smaller Components */}
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}
