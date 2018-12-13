import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import { getTypesFor, parseGroups } from './utils.js';

const BuildingForm = (props) => {
  return (
    <form className="form form-horizontal" id="addBuildingForm" onSubmit={props.addBuilding}>
      <div className="row">
        <h3 className="centerAlign">Lisää rakennus</h3>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Nimi: </ControlLabel>
            <FormControl
              type="text" placeholder="Kohteen nimi"
              name="buildingName"
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Lähiosoite: </ControlLabel>
            <FormControl
              type="text" placeholder="Lähiosoite"
              name="buildingAddress"
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Paikkakunta: </ControlLabel>
            <FormControl
              type="text" placeholder="Paikkakunta"
              name="buildingCounty"
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Omistaja/hallinnoija: </ControlLabel>
            <FormControl
              type="text" placeholder="Omistaja"
              name="buildingOwner"
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennusvuosi: </ControlLabel>
            <FormControl
              type="number" placeholder="Rakennusvuosi"
              name="buildingYear"
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennuksen käyttötarkoitus: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingType">
              {
                getTypesFor('buildingType')
              };
            </FormControl>
            {/* {buildings.map((building,i) => <tr key={i}>} */}

          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennuksen runkorakenne: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingMaterial">
              {
                getTypesFor('buildingMaterial')
              };
            </FormControl>
            {/* {buildings.map((building,i) => <tr key={i}>} */}

          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennuksen katto: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingRoof">
              {
                getTypesFor('buildingRoof')
              };
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennuksen lämmitysmuoto: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingWarmingSystem">
              {
                getTypesFor('buildingWarmingSystem')
              };
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennuksen kerrosluku: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingFloorsNumber">
              {
                getTypesFor('buildingFloorsNumber')
              };
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennuksen alapohjarakenne: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingFloorBase">
              {
                getTypesFor('buildingFloorBase')
              };
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Lisätiedot: </ControlLabel>
            <FormControl
              componentClass="textarea" placeholder="Syötä kuvaus"
              name="buildingDesc"
            />
          </FormGroup>
        </div>
        {props.groups && props.groups.length > 1 &&
          <div className="col-md-12">
            <FormGroup>
              <ControlLabel>Rakennuksen omistaja (vaikuttaa kohteen näkyvyyteen sisäänkirjautuneille käyttäjille): </ControlLabel>
              <FormControl componentClass="select" placeholder="Valitse" name="dataOwner">
                {
                  parseGroups(props.groups)
                };
              </FormControl>
            </FormGroup>
          </div>
        }

        {props.groups && props.groups.length === 1 &&
          <input type="hidden" name="dataOwner" value={props.groups[0]} />
        }
        </div>
      <FormGroup>
        <Button type="submit" bsStyle="success" bsSize="large" block>Lähetä</Button>
      </FormGroup>
    </form>
  );
}

export default BuildingForm;
