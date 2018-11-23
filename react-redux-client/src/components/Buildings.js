import React from 'react';
import { Alert, Glyphicon, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import BuildingEditForm from './BuildingEditForm';
import FileUploadForm from './FileUploadForm';
import FileEditForm from './FileEditForm';

/**
 * Class that handles all actions related to the view showing all buildings (i.e. first view after login)
 */
export default class Buildings extends React.Component {
  constructor(props) {
    super(props);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.submitEditBuilding = this.submitEditBuilding.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.cofirmDeleteBuilding = this.cofirmDeleteBuilding.bind(this);
    this.hideFileUploadModal = this.hideFileUploadModal.bind(this);
    this.hideFileEditModal = this.hideFileEditModal.bind(this);
    this.hideFileDeleteModal = this.hideFileDeleteModal.bind(this);
    this.confirmDeleteFile = this.confirmDeleteFile.bind(this);
    this.searchTable = this.searchTable.bind(this);
  }

  /**
   * Add user login details (groups) to the request to the server in
   * order to pass the correct buildings that this user is allowed to handle.
   */
  componentDidMount() {
    const appState = this.props.mappedAppState;
    if ( appState && appState.kc && appState.kc.keycloak ) {
      let groups = appState.kc.keycloak.tokenParsed.groups;
      const data = new FormData();
      data.append('groups', JSON.stringify(groups));
      this.props.fetchBuildings(data);
    } 
  }

  /**
   * Submit building edit action and bind the form data to the on coming request to the back end
   * @param {} e 
   */
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
      data.append('dataOwner', editForm.dataOwner.value);
      this.props.mappedEditBuilding(data);
    }
    else {
      return;
    }

  }

  // Below show, hide, confirm methods for redux cache data binding

  showEditModal(buildingToEdit) {
    this.props.mappedshowEditModal(buildingToEdit);
  }

  hideEditModal() {
    this.props.mappedhideEditModal();
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
   * File handling related functions below
   */

  /**
   * Bind the data needed for file upload.
   * 
   * File upload action calls this method when submitting data
   */
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

  /**
   * Edit file data binder
   */
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

  // Below redux cache data binders for download, show, hide etc.  

  downloadFile = (fileId, name) => {
    this.props.mappedFileDownload(fileId, name);
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
  * --- FILE RELATED FUNCTIONS ENDS
  */

  // Util function to filter the main table of buildings by search query
  searchTable() {
    // Declare variables 
    var input, filter, table, tr, i;
    // get the react refernce of the rendered input field
    input = this.refs.bfilter;
    if (input) {
      // make it case insensitive
      filter = input.value.toUpperCase();
      table = this.refs.btable;
      if (table) {
        tr = table.getElementsByTagName("tr");
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          var tds = tr[i].getElementsByTagName("td");
          if (tds.length > 0) {
            var show = false;
            for (var ix = 0; ix < tds.length; ix++) {
              if (tds[ix]) {
                if (tds[ix].innerHTML.toUpperCase().indexOf(filter) > -1) {
                  show = true;
                }
              }
            }
            if (show) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }

      }
    }
  }

  /**
   * Renderer for buildings main view
   */
  render() {
    const buildingState = this.props.mappedBuildingState;
    const buildings = buildingState.buildings;
    const editBuilding = buildingState.buildingToEdit;
    const addrQueryBase = "http://maps.google.com/?q=";
    const appState = this.props.mappedAppState;
    var canEdit = false;
    if ( appState.kc.keycloak.realmAccess ) {
      canEdit = appState.kc.keycloak.realmAccess.roles.indexOf('editor') > -1 ||
      appState.kc.keycloak.realmAccess.roles.indexOf('admin') > -1 ;
    }
   
    return (
      <div className="col-md-12">
        <h3 className="centerAlign">Kaikki kohteet</h3>
        <div className="col-xs-3">
          <input type="text" ref="bfilter" onKeyUp={this.searchTable} placeholder="Hae.." className="form-control" />
        </div>
        {!buildings && buildingState.isFetching &&
          <p>Ladataan tietoa rakennuksista....</p>
        }
        {buildings && buildings.length <= 0 && !buildingState.isFetching &&
          <p>Ei kohteita saatavilla.</p>
        }
        {buildings && buildings.length > 0 && !buildingState.isFetching &&
          <table ref="btable" className="table buildingsTable">
            <thead>
              <tr><th>Nimi</th><th>Rakennuksen käyttötarkoitus</th>
              <th>Rakennusvuosi</th>
              <th>Omistaja/hallinnoija</th>
              <th>Osoite</th>
              <th className="textCenter">Näytä</th>
              {canEdit &&
              <th className="textCenter">Muokkaa</th>
              }
              {canEdit &&
              <th className="textCenter">Poista kohde</th>
              }
              <th className="textCenter">Tiedostot</th></tr>
            </thead>
            <tbody>
              {buildings.map((building, i) => <tr key={i}>
                <td>{building.buildingName}</td>
                <td>{building.buildingType}</td>
                <td>{building.buildingYear}</td>
                <td>{building.buildingOwner}</td>
                <td><a target="_blank" href={addrQueryBase + building.buildingAddress + ", " + building.buildingCounty}>{building.buildingAddress}, {building.buildingCounty}</a></td>
                <td className="textCenter"><Link to={`/${building._id}`}>Avaa rakennuksen tiedot</Link> </td>
                {canEdit &&
                <td className="textCenter">
                    <Button onClick={() => this.showEditModal(building)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="edit" /></Button> 
                </td>
                }
                {canEdit &&
                <td className="textCenter">
                    <Button onClick={() => this.showDeleteModal(building)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button>
                </td>
                }
                <td className="textCenter">
                  {canEdit &&
                    <Button onClick={() => this.showFileUploadModal(building._id)} bsStyle="success" bsSize="xsmall"><Glyphicon glyph="plus" /> Lisää tiedosto</Button>
                  }
                  {canEdit &&
                    <br />
                  }
                  {building.files.map((file, ix) =>
                    <span key="ix">
                      <a href="true" onClick={(e) => { e.preventDefault(); this.downloadFile(file._id, file.originalname) }} style={{ cursor: 'pointer' }}>{file.originalname}</a><span>&nbsp;
                        {canEdit &&
                          <Button onClick={() => this.showFileEditModal(file)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="edit" /></Button>
                        }
                        {canEdit &&
                          <Button onClick={() => this.showFileDeleteModal(file)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button>
                        }
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
                <BuildingEditForm buildingData={editBuilding} editBuilding={this.submitEditBuilding} groups={appState.kc.keycloak.tokenParsed.groups} />
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
