// ./react-redux-client/src/components/App.js
import Keycloak from 'keycloak-js';
import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import BuildingForm from './BuildingForm';

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
      data.append('dataOwner', form.dataOwner.value);

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
                <Nav>
                <LinkContainer to="/">
                  <NavItem>VOC online</NavItem>
                </LinkContainer>
                </Nav>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer to={{ pathname: '/', query: {} }} onClick={this.toggleAddBuilding}>
                  <NavItem eventKey={1}>Lisää uusi rakennus</NavItem>
                </LinkContainer>
              </Nav>
              <Nav pullRight>
                <NavItem onClick={this.logout} eventKey={2}>Kirjaudu ulos ({appState.kc.keycloak.idTokenParsed.preferred_username})                
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        }
        {appState.kc && appState.kc.authenticated &&
          <div className="container">
            {appState.showAddBuilding &&
              <BuildingForm addBuilding={this.addBuilding} groups={appState.kc.keycloak.tokenParsed.groups} />
            }
            { /* Each Smaller Components */}
            {this.props.children}
          </div>
        }

        {/* {appState.kc && appState.kc.authenticated &&
          <footer
        } */}
      </div>
    );
  }
}
