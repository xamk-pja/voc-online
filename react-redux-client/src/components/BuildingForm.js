import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import { getTypesFor } from './utils.js';

const BuildingForm = (props) => {
  return (
    <form className="form form-horizontal" id="addBuildingForm" onSubmit={props.addBuilding}>
      <div className="row">
        <h3 className="centerAlign">Lisää rakennus</h3>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Kohde: </ControlLabel>
            <FormControl
              type="text" placeholder="Kohteen nimi"
              name="todoText"
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
            <ControlLabel>Kuvaus: </ControlLabel>
            <FormControl
              componentClass="textarea" placeholder="Syötä kuvaus"
              name="todoDesc"
            />
          </FormGroup>
        </div>
      </div>
      <FormGroup>
        <Button type="submit" bsStyle="success" bsSize="large" block>Lähetä</Button>
      </FormGroup>
    </form>
  );
}

// onDropdownSelected(e) {
//  console.log("THE VAL", e.target.value);
//  //here you will see the current selected value of the select input
// }

export default BuildingForm;
