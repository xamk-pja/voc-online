import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const CalcPointAddForm = (props) => {
  return (
    <form className="form form-horizontal" id="CalcPointAddForm" onSubmit={props.addCalcPoint}>
      <div className="row">
        <h3 className="centerAlign">Lisää mittauspaikka rakennukselle</h3>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Mittauspaikka: </ControlLabel>
            <FormControl
              type="text" placeholder="Nimi"
              name="shortDesc"
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Kuvaus: </ControlLabel>
            <FormControl
              componentClass="textarea" placeholder="Syötä kuvaus"
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
