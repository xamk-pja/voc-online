import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { getTypesFor } from './utils.js';

const ResultEditForm = (props) => {
  return (
    <form className="form form-horizontal" id="ResultEditForm" onSubmit={props.editResult}>
      <div className="row">
        <h3 className="centerAlign">Muokkaa mittaustulosta</h3>
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
