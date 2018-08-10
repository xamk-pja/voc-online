import React from 'react';
import { Alert, Glyphicon, Button, Modal } from 'react-bootstrap';
import FileUploadForm from './FileUploadForm';
import FileEditForm from './FileEditForm';

export default class Files extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.hideFileUploadModal = this.hideFileUploadModal.bind(this);
    this.hideFileEditModal = this.hideFileEditModal.bind(this);
    this.hideFileDeleteModal = this.hideFileDeleteModal.bind(this);
    this.confirmDeleteFile = this.confirmDeleteFile.bind(this);
    // this.downloadFile = this.downloadFile.bind(this);
  }

  downloadFile = (fileId) => {
    document.preventDefault;
    const url = `http://localhost:3001/api/files/${fileId}`;
    window.open(url, '_blank');
  }

  componentWillMount() {
    // this.props.fetchBuildings();
  }

  // Action calls this method when submitting data
  fileUpload = (e) => {
    e.preventDefault();
    const fileForm = document.getElementById('FileUploadForm');
    const file = fileForm['file'].files[0];

    if (file !== "") {
      const data = new FormData();
      data.append('fileDesc', fileForm.fileDesc.value);
      data.append('file', file);
      data.append('filename', file.name);
      data.append('parentId', fileForm.parentId.value);
      this.props.mappedFileUpload(data);
    }
    else {
      return;
    }
  }

  // Action calls this method when submitting data
  fileEdit = (e) => {
    e.preventDefault();
    const fileForm = document.getElementById('FileEditForm');
    const file = fileForm['file'].files[0];

    if (file !== "") {
      const data = new FormData();
      data.append('fileDesc', fileForm.fileDesc.value);
      this.props.mappedFileUpload(data);
    }
    else {
      return;
    }
  }


  showFileUploadModal(parentId) {
    this.props.mappedFileUploadModal(parentId);
  }

  hideFileUploadModal() {
    this.props.mappedHideFileUploadModal();
  }

  showFileEditModal(file) {
    this.props.mappedFileEditModal(file);
  }

  hideFileEditModal() {
    this.props.mappedHideFileEditModal();
  }

  hideFileDeleteModal() {
    this.props.mappedHideFileDeleteModal();
  }

  showFileDeleteModal(file) {
    this.props.mappedShowFileDeleteModal(file);
  }

  confirmDeleteFile() {
    this.props.mappedDeleteFile(this.props.mappedBuildingState.fileToDelete);
  }

  render() {
    const buildingState = this.props.mappedBuildingState;
    return (
      <div>
        <Modal
          show={buildingState.showFileUploadModal}
          onHide={this.hideFileUploadModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >

          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Tiedosto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">
              {buildingState.showFileUploadModal &&
                <FileUploadForm parentId={buildingState.fileParent} submit={this.fileUpload} />
              }

              {buildingState.showFileUploadModal && buildingState.isFetching &&
                <Alert bsStyle="info">
                  <strong>Päivitetään...... </strong>
                </Alert>
              }
              {buildingState.showFileUploadModal && !buildingState.isFetching && buildingState.error &&
                <Alert bsStyle="danger">
                  <strong>Epäonnistui. {buildingState.error} </strong>
                </Alert>
              }
              {buildingState.successMsg &&
                <Alert bsStyle="success">
                  {buildingState.successMsg} rakennukselle.
              </Alert>
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideFileUploadModal}>Sulje</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={buildingState.showFileEditModal}
          onHide={this.hideFileEditModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >

          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Muokkaa tiedoston lisätietoja</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">
              {buildingState.showFileEditModal &&
                <FileEditForm file={buildingState.fileToEdit} submit={this.fileEdit} />
              }

              {buildingState.showFileEditModal && buildingState.isFetching &&
                <Alert bsStyle="info">
                  <strong>Päivitetään...... </strong>
                </Alert>
              }
              {buildingState.showFileEditModal && !buildingState.isFetching && buildingState.error &&
                <Alert bsStyle="danger">
                  <strong>Epäonnistui. {buildingState.error} </strong>
                </Alert>
              }
              {buildingState.successMsg &&
                <Alert bsStyle="success">
                  {buildingState.successMsg} rakennukselle.
              </Alert>
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideFileEditModal}>Sulje</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={buildingState.showFileDeleteModal}
          onHide={this.hideFileDeleteModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Poista tiedosto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {buildingState.fileToDelete && !buildingState.error && !buildingState.isFetching &&
              <Alert bsStyle="warning">
                Oletko varma, että haluat poistaa tiedoston <strong>{buildingState.fileToDelete.originalname} </strong> ?
              </Alert>
            }
            {buildingState.fileToDelete && buildingState.error &&
              <Alert bsStyle="warning">
                Epäonnistui. <strong>{buildingState.error} </strong>
              </Alert>
            }

            {buildingState.fileToDelete && !buildingState.error && buildingState.isFetching &&
              <Alert bsStyle="success">
                <strong>Poistetaan.... </strong>
              </Alert>
            }

            {!buildingState.fileToDelete && !buildingState.error && !buildingState.isFetching &&
              <Alert bsStyle="success">
                Tiedosto <strong>{buildingState.successMsg} </strong>
              </Alert>
            }
          </Modal.Body>
          <Modal.Footer>
            {!buildingState.successMsg && !buildingState.isFetching &&
              <div>
                <Button onClick={this.confirmDeleteFile}>Kyllä</Button>
                <Button onClick={this.hideFileDeleteModal}>Ei</Button>
              </div>
            }
            {buildingState.successMsg && !buildingState.isFetching &&
              <Button onClick={this.hideFileDeleteModal}>Sulje</Button>
            }
          </Modal.Footer>
        </Modal>
        </div>
    );
  }
}
