import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { getTypesFor } from './utils.js';

const BuildingEditForm = (props) => {
  return (
    <form className="form form-horizontal" id="EditBuildingForm" onSubmit={props.editBuilding}>
      <div className="row">
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Nimi: </ControlLabel>
            <input type="hidden" value={props.buildingData._id} name="id" />
            <FormControl
              type="text" placeholder="Nimi"
              name="buildingName" defaultValue={props.buildingData.buildingName}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Lähiosoite: </ControlLabel>
            <FormControl
              type="text" placeholder="Lähiosoite"
              name="buildingAddress" defaultValue={props.buildingData.buildingAddress}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Paikkakunta: </ControlLabel>
            <FormControl
              type="text" placeholder="Paikkakunta"
              name="buildingCounty" defaultValue={props.buildingData.buildingCounty}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Omistaja/hallinnoija: </ControlLabel>
            <FormControl
              type="text" placeholder="Omistaja"
              name="buildingOwner" defaultValue={props.buildingData.buildingOwner}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennusvuosi: </ControlLabel>
            <FormControl
              type="number" placeholder="Rakennusvuosi"
              name="buildingYear" defaultValue={props.buildingData.buildingYear}
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
            <ControlLabel>Rakennuksen runkorakenne: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingMaterial" defaultValue={props.buildingData.buildingMaterial}>
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
            <FormControl componentClass="select" placeholder="Valitse" name="buildingRoof" defaultValue={props.buildingData.buildingRoof}>
              {
                getTypesFor('buildingRoof')
              };            
            </FormControl> 
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennuksen lämmitysmuoto: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingWarmingSystem" defaultValue={props.buildingData.buildingWarmingSystem}>
              {
                getTypesFor('buildingWarmingSystem')
              };            
            </FormControl> 
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennuksen kerrosluku: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingFloorsNumber" defaultValue={props.buildingData.buildingFloorsNumber}>
              {
                getTypesFor('buildingFloorsNumber')
              };            
            </FormControl> 
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Rakennuksen alapohjarakenne: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="buildingFloorBase" defaultValue={props.buildingData.buildingFloorBase}>
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
              componentClass="textarea" placeholder="Enter description"
              name="buildingDesc" defaultValue={props.buildingData.buildingDesc}
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
