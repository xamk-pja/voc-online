import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { getTypesFor } from './utils.js';

const BuildingEditForm = (props) => {
  return (
    <form className="form form-horizontal" id="EditBuildingForm" onSubmit={props.editBuilding}>
      <div className="row">
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Kohde: </ControlLabel>
            <input type="hidden" value={props.buildingData._id} name="id" />
            <FormControl
              type="text" placeholder="Syötä kohde"
              name="todoText" defaultValue={props.buildingData.todoText}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennuksen käyttötarkoitus: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingType" defaultValue={props.buildingData.buildingType}>
              {
                getTypesFor('buildingType')
              };            
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Lisätiedot: </ControlLabel>
            <FormControl
              componentClass="textarea" placeholder="Enter description"
              name="todoDesc" defaultValue={props.buildingData.todoDesc}
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

export default BuildingEditForm;
