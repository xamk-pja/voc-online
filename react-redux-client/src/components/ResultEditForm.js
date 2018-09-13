import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { getTypesFor } from './utils.js';
var DatePicker = require("react-16-bootstrap-date-picker");

const ResultEditForm = (props) => {
  return (
    <form className="form form-horizontal" id="ResultEditForm" onSubmit={props.editResult}>
      <div className="row">
        <h3 className="centerAlign">Muokkaa mittaustulosta</h3>
        
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Mittauksen ajankohta: </ControlLabel>
            <DatePicker id="resultdate" name="resultdate" value={props.resultToEdit.resultdate} />
          </FormGroup>
        </div>

        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Säätila: </ControlLabel>
            <FormControl
              type="text" placeholder="Säätila"
              name="weather" defaultValue={props.resultToEdit.weather}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Tulokset: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="measurementMetrics" defaultValue={props.resultToEdit.measurementMetrics}>
              {
                getTypesFor('measurementMetrics')
              };
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <input type="hidden" value={props.resultToEdit._id} name="id" />
          <FormGroup>
            <ControlLabel>Käytetty mittalaite: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="usedMetrics" defaultValue={props.resultToEdit.usedMetrics}>
              {
                getTypesFor('usedMetrics')
              };
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Lisätiedot: </ControlLabel>
            <FormControl
              type="text" placeholder="Lisätiedot"
              name="resultDetails" defaultValue={props.resultToEdit.resultDetails}
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

export default ResultEditForm;
