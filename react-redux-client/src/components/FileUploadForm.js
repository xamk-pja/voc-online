import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const FileUploadForm = (props) => {
  return (
    <form className="form form-horizontal" id="FileUploadForm" onSubmit={props.submit}>
      <div className="row">
        <h3 className="centerAlign">Lisää tiedosto</h3>
        <div className="col-md-12">
        <input type="hidden" value={props.parentId} name="parentId" />

          <FormGroup>
            <ControlLabel>Valitse tiedosto: </ControlLabel>
            <FormControl
              type="file" name="file" id="file"
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Kuvaus: </ControlLabel>
            <FormControl
              componentClass="textarea" placeholder="Syötä kuvaus"
              name="fileDesc"
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

export default FileUploadForm;
