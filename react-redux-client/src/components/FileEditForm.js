import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const FileEditForm = (props) => {
  return (
    <form className="form form-horizontal" id="FileEditForm" onSubmit={props.submit}>
      <div>
        <h3 className="centerAlign">{props.file.originalname}</h3>
        <div className="col-md-12">
        <input type="hidden" value={props.file._id} name="id" />
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Kuvaus: </ControlLabel>
            <FormControl
              componentClass="textarea" placeholder="Syötä kuvaus"
              name="fileDesc" defaultValue={props.file.fileDesc}
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

export default FileEditForm;
