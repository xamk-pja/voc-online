import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { getTypesFor } from './utils.js';

var DatePicker = require("react-16-bootstrap-date-picker");
const ResultAddForm = (props) => {
  return (
    <form className="form form-horizontal" id="ResultAddForm" onSubmit={props.addResult}>
      <div className="row">
        <h3 className="centerAlign">Lisää mittaustulos mittauspaikalle</h3>
        <input type="hidden" value={props.calcPointId} name="parentId" />

        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Mittauksen ajankohta: </ControlLabel>
            <DatePicker id="resultdate" name="resultdate" value={props.addedResult && props.addedResult.resultdate} />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Säätila: </ControlLabel>
            <FormControl
              type="text" placeholder="Säätila"
              name="weather"
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Tulokset: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="measurementMetrics">
              {
                getTypesFor('measurementMetrics')
              };
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Käytetyt mittalaitteet/menetelmät: </ControlLabel>
            <FormControl componentClass="select" placeholder="Valitse" name="usedMetrics">
              {
                getTypesFor('usedMetrics')
              };
            </FormControl>
          </FormGroup>
        </div>
      </div>
      <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Lisätiedot: </ControlLabel>
            <FormControl
              type="text" placeholder="Lisätiedot"
              name="resultDetails"
            />
          </FormGroup>
        </div>
      <FormGroup>
        <Button type="submit" bsStyle="success" bsSize="large" block>Lähetä</Button>
      </FormGroup>
    </form>
  );
}

export default ResultAddForm;
