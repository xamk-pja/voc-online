import React from 'react';
import { Alert, Glyphicon, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import BuildingEditForm from './BuildingEditForm';
import FileUploadForm from './FileUploadForm';
import FileEditForm from './FileEditForm';

export default class Buildings extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.submitEditBuilding = this.submitEditBuilding.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.cofirmDeleteBuilding = this.cofirmDeleteBuilding.bind(this);
    this.hideFileUploadModal = this.hideFileUploadModal.bind(this);
    this.hideFileEditModal = this.hideFileEditModal.bind(this);
    this.hideFileDeleteModal = this.hideFileDeleteModal.bind(this);
    this.confirmDeleteFile = this.confirmDeleteFile.bind(this);
    // this.downloadFile = this.downloadFile.bind(this);
  }

  componentWillMount() {
    this.props.fetchBuildings();
  }

  showEditModal(buildingToEdit) {
    this.props.mappedshowEditModal(buildingToEdit);
  }

  hideEditModal() {
    this.props.mappedhideEditModal();
  }

  submitEditBuilding(e) {
    e.preventDefault();
    const editForm = document.getElementById('EditBuildingForm');
    if (editForm.buildingName.value !== "") {

      const data = new FormData();
      data.append('id', editForm.id.value);
      data.append('buildingName', editForm.buildingName.value);
      data.append('buildingAddress', editForm.buildingAddress.value);
      data.append('buildingCounty', editForm.buildingCounty.value);
      data.append('buildingOwner', editForm.buildingOwner.value);
      data.append('buildingYear', editForm.buildingYear.value);
      data.append('buildingType', editForm.buildingType.value);
      data.append('buildingMaterial', editForm.buildingMaterial.value);
      data.append('buildingFloorBase', editForm.buildingFloorBase.value);
      data.append('buildingRoof', editForm.buildingRoof.value);
      data.append('buildingWarmingSystem', editForm.buildingWarmingSystem.value);
      data.append('buildingFloorsNumber', editForm.buildingFloorsNumber.value);
      data.append('buildingDesc', editForm.buildingDesc.value);
      this.props.mappedEditBuilding(data);
    }
    else {
      return;
    }

  }
  
  hideDeleteModal() {
    this.props.mappedhideDeleteModal();
  }

  showDeleteModal(buildingToDelete) {
    this.props.mappedshowDeleteModal(buildingToDelete);
  }

  cofirmDeleteBuilding() {
    this.props.mappedDeleteBuilding(this.props.mappedBuildingState.buildingToDelete);
  }


  /**
   * FILE RELATED FUNCTIONS
   */
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

  // Edit file
  fileEdit = (e) => {
    e.preventDefault();
    const fileForm = document.getElementById('FileEditForm');
    const file = fileForm.file;

    if (file !== "") {
      const data = new FormData();
      data.append('fileDesc', fileForm.fileDesc.value);
      data.append('id', fileForm.id.value);
      this.props.mappedFileEdit(data);
    }
    else {
      return;
    }
  }

  downloadFile = (fileId) => {
    const url = `http://localhost:3001/api/files/${fileId}`;
    window.open(url, '_blank');
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

   /**
   * FILE RELATED FUNCTIONS ENDS
   */


  render() {
    const buildingState = this.props.mappedBuildingState;
    const buildings = buildingState.buildings;
    const editBuilding = buildingState.buildingToEdit;
    const addrQueryBase = "http://maps.google.com/?q=";
    return (
      <div className="col-md-12">
        <h3 className="centerAlign">Kaikki kohteet</h3>
        {!buildings && buildingState.isFetching &&
          <p>Ladataan tietoa rakennuksista....</p>
        }
        {buildings && buildings.length <= 0 && !buildingState.isFetching &&
          <p>Ei kohteita saatavilla.</p>
        }
        {buildings && buildings.length > 0 && !buildingState.isFetching &&
          <table className="table booksTable">
            <thead>
              <tr><th>Nimi</th><th>Rakennuksen käyttötarkoitus</th><th>Omistaja/hallinnoija</th><th>Osoite</th><th className="textCenter">Näytä</th><th className="textCenter">Muokkaa</th><th className="textCenter">Poista kohde</th><th className="textCenter">Tiedostot</th></tr>
            </thead>
            <tbody>
              {buildings.map((building, i) => <tr key={i}>
                <td>{building.buildingName}</td>
                <td>{building.buildingType}</td>
                <td>{building.buildingOwner}</td>
                <td><a target="_blank" href={addrQueryBase + building.buildingAddress + ", " + building.buildingCounty}>{building.buildingAddress}, {building.buildingCounty}</a></td>
                <td className="textCenter"><Link to={`/${building._id}`}>Avaa rakennuksen tiedot</Link> </td>
                <td className="textCenter"><Button onClick={() => this.showEditModal(building)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="edit" /></Button></td>
                <td className="textCenter"><Button onClick={() => this.showDeleteModal(building)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button></td>
                <td className="textCenter"><Button onClick={() => this.showFileUploadModal(building._id)} bsStyle="success" bsSize="xsmall"><Glyphicon glyph="plus" /> Lisää tiedosto</Button>
                  <br />
                  {building.files.map((file, i) =>
                    <span>
                      <a href onClick={(e) => {e.preventDefault(); this.downloadFile(file._id)}} style={{cursor:'pointer'}}>{file.originalname}</a><span>&nbsp;
                      <Button onClick={() => this.showFileEditModal(file)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="edit" /></Button>
                      <Button onClick={() => this.showFileDeleteModal(file)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button>
                      </span>
                      <br />
                    </span>
                  )}
                </td>
              </tr>)
              }
            </tbody>
          </table>
        }

        {/* Modal for editing building */}
        <Modal
          show={buildingState.showEditModal}
          onHide={this.hideEditModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Muokkaa kohdetta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">
              {editBuilding &&
                <BuildingEditForm buildingData={editBuilding} editBuilding={this.submitEditBuilding} />
              }
              {editBuilding && buildingState.isFetching &&
                <Alert bsStyle="info">
                  <strong>Päivitetään...... </strong>
                </Alert>
              }
              {editBuilding && !buildingState.isFetching && buildingState.error &&
                <Alert bsStyle="danger">
                  <strong>Epäonnistui. {buildingState.error} </strong>
                </Alert>
              }
              {editBuilding && !buildingState.isFetching && buildingState.successMsg &&
                <Alert bsStyle="success">
                  Kohde <strong> {editBuilding.buildingName} </strong>{buildingState.successMsg}
                </Alert>
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideEditModal}>Sulje</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for deleting building */}
        <Modal
          show={buildingState.showDeleteModal}
          onHide={this.hideDeleteModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Poista kohde</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {buildingState.buildingToDelete && !buildingState.error && !buildingState.isFetching &&
              <Alert bsStyle="warning">
                Oletko varma, että haluat poistaa kohteen <strong>{buildingState.buildingToDelete.buildingName} </strong> ?
              </Alert>
            }
            {buildingState.buildingToDelete && buildingState.error &&
              <Alert bsStyle="warning">
                Epäonnistui. <strong>{buildingState.error} </strong>
              </Alert>
            }

            {buildingState.buildingToDelete && !buildingState.error && buildingState.isFetching &&
              <Alert bsStyle="success">
                <strong>Poistetaan.... </strong>
              </Alert>
            }

            {!buildingState.buildingToDelete && !buildingState.error && !buildingState.isFetching &&
              <Alert bsStyle="success">
                Rakennus <strong>{buildingState.successMsg} </strong>
              </Alert>
            }
          </Modal.Body>
          <Modal.Footer>
            {!buildingState.successMsg && !buildingState.isFetching &&
              <div>
                <Button onClick={this.cofirmDeleteBuilding}>Yes</Button>
                <Button onClick={this.hideDeleteModal}>No</Button>
              </div>
            }
            {buildingState.successMsg && !buildingState.isFetching &&
              <Button onClick={this.hideDeleteModal}>Close</Button>
            }
          </Modal.Footer>
        </Modal>


        {
          /**
            FILE RELATED MODALS - TODO: HOW TO MAKE THEM REUSABLE?
           */
        }
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

         {/* Modal for deleting file */}
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
