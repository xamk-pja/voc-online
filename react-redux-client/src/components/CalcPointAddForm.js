import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { getTypesFor } from './utils.js';

const CalcPointAddForm = (props) => {
  return (
    <form className="form form-horizontal" id="CalcPointAddForm" onSubmit={props.addCalcPoint}>
      <div className="row">
        <h3 className="centerAlign">Lisää mittauspaikka rakennukselle</h3>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Tilan nimi / numero: </ControlLabel>
            <FormControl
              type="text" placeholder="Tilan nimi / numero"
              name="shortDesc"
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Kerros: </ControlLabel>
            <FormControl
              type="number" placeholder="Kerros"
              name="cpFloorNumber"
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Lattiamateriaali: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="cpFloorMaterial">
              {
                getTypesFor('cpFloorMaterial')
              };            
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Kattomateriaali: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="cpRoofMaterial">
              {
                getTypesFor('cpRoofMaterial')
              };            
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Seinämateriaali: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="cpCeilingMaterial">
              {
                getTypesFor('cpCeilingMaterial')
              };            
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Ilmanvaihto: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="cpVentilation">
              {
                getTypesFor('cpVentilation')
              };            
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Lisätiedot: </ControlLabel>
            <FormControl
              componentClass="textarea" placeholder="Lisätiedot"
              name="longDesc"
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

export default CalcPointAddForm;
