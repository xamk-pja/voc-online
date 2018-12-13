import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { getTypesFor } from './utils.js';

const CalcPointEditForm = (props) => {
  return (
    <form className="form form-horizontal" id="CalcPointEditForm" onSubmit={props.calcPointToEdit}>
      <div className="row">
        <h3 className="centerAlign">Muokkaa rakennuksen mittauspaikkaa</h3>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Tilan nimi / numero: </ControlLabel>
            <input type="hidden" value={props.calcPointData._id} name="id" />
            <FormControl
              type="text" placeholder="Tilan nimi / numero"
              name="shortDesc" defaultValue={props.calcPointData.shortDesc}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Kerros: </ControlLabel>
            <FormControl
              type="number" placeholder="Kerros"
              name="cpFloorNumber" defaultValue={props.calcPointData.cpFloorNumber}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Lattiamateriaali: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="cpFloorMaterial" defaultValue={props.calcPointData.cpFloorMaterial}>
              {
                getTypesFor('cpFloorMaterial')
              };            
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Kattomateriaali: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="cpRoofMaterial" defaultValue={props.calcPointData.cpRoofMaterial}>
              {
                getTypesFor('cpRoofMaterial')
              };            
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Seinämateriaali: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="cpCeilingMaterial" defaultValue={props.calcPointData.cpCeilingMaterial}>
              {
                getTypesFor('cpCeilingMaterial')
              };            
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Ilmanvaihto: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="cpVentilation" defaultValue={props.calcPointData.cpVentilation}>
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
              componentClass="textarea" placeholder="Syötä kuvaus"
              name="longDesc" defaultValue={props.calcPointData.longDesc}
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

export default CalcPointEditForm;
