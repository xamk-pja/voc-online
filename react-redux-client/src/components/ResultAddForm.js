import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { getTypesFor } from './utils.js';
import { handleChange } from './utils.js';
var DatePicker = require("react-16-bootstrap-date-picker");

const ResultAddForm = (props) => {
  return (
    <form className="form form-horizontal" id="ResultAddForm" onSubmit={props.addResult}>
      <div className="row">
        <h3 className="centerAlign">Lisää mittaustulos mittauspaikalle</h3>
        <div className="col-md-12">
        <input type="hidden" value={props.calcPointId} name="parentId" />

          <FormGroup>
            <ControlLabel>Mittauksen tulos: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="usedMetrics">
              {
                getTypesFor('usedMetrics')
              };            
            </FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Mittauksen ajankohta: </ControlLabel>
            <DatePicker id="example-datepicker" onChange={this.handleChange} />
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

export default ResultAddForm;
