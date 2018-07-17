import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const CalcPointEditForm = (props) => {
  return (
    <form className="form form-horizontal" id="CalcPointEditForm" onSubmit={props.editCalcPoint}>
      <div className="row">
        <h3 className="centerAlign">Muokkaa rakennuksen mittauspaikkaa</h3>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Mittauspaikka: </ControlLabel>
            <FormControl
              type="text" placeholder="Nimi"
              name="shortDesc" defaultValue={props.calcPointData.shortDesc}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Lisätieto: </ControlLabel>
            <FormControl
              componentClass="textarea" placeholder="Syötä kuvaus"
              name="longDesc" defaultValue={props.calcPointData.shortDesc}
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
