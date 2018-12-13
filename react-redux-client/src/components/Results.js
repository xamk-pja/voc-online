/*
Page for singe building information selected from the main table

*/

import React from 'react';
import { Alert, Button, Glyphicon, Modal } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import FileEditForm from './FileEditForm';
import FileUploadForm from './FileUploadForm';
import ResultAddForm from './ResultAddForm';
import ResultEditForm from './ResultEditForm';
import { getLabelFor } from './utils.js';
import { Link } from 'react-router';


export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.showAddResultModal = this.showAddResultModal.bind(this);
    this.hideAddResultModal = this.hideAddResultModal.bind(this);
    this.showEditResultModal = this.showEditResultModal.bind(this);
    this.hideEditResultModal = this.hideEditResultModal.bind(this);
    this.submitAddResult = this.submitAddResult.bind(this);
    this.submitEditResult = this.submitEditResult.bind(this);
    this.hideDeleteResultModal = this.hideDeleteResultModal.bind(this);
    this.confirmDeleteResult = this.confirmDeleteResult.bind(this);
    this.hideFileUploadModal = this.hideFileUploadModal.bind(this);
    this.hideFileEditModal = this.hideFileEditModal.bind(this);
    this.hideFileDeleteModal = this.hideFileDeleteModal.bind(this);
    this.confirmDeleteFile = this.confirmDeleteFile.bind(this);
  }

  componentDidMount() {
    this.props.mappedFetchResultsById(this.props.params.id);
  }

  showAddResultModal(parentId) {
    this.props.mappedShowAddResultModal(parentId);
  }

  hideAddResultModal() {
    this.props.mappedHideAddResultModal();
  }

  showEditResultModal(result) {
    this.props.mappedShowEditResultModal(result);
  }

  hideEditResultModal() {
    this.props.mappedHideEditResultModal();
  }

  hideDeleteResultModal() {
    this.props.mappedHideDeleteResultModal();
  }

  showDeleteResultModal(resultToDelete) {
    this.props.mappedShowDeleteResultModal(resultToDelete);
  }

  confirmDeleteResult() {
    this.props.mappedDeleteResult(this.props.mappedBuildingState.resultToDelete);
  }

  /**
 * FILE RELATED FUNCTIONS
 * 
 * DUPLICATED IN Buildings.js - TODO: refactor duplicates
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
  * FILE RELATED FUNCTIONS ENDS
  */


  submitAddResult(e) {
    e.preventDefault();
    const addResultForm = document.getElementById('ResultAddForm');
    if (addResultForm.parentId.value !== "") {
      const data = new FormData();
      data.append('parentId', addResultForm.parentId.value);
      data.append('usedMetrics', addResultForm.usedMetrics.value);
      data.append('measurementMetrics', addResultForm.measurementMetrics.value);
      data.append('weather', addResultForm.weather.value);
      data.append('resultDetails', addResultForm.resultDetails.value);
      data.append('resultdate', addResultForm.resultdate.value);
      this.props.mappedAddResultForCalcPoint(data);
    }
    else {
      return;
    }
  }

  submitEditResult(e) {
    e.preventDefault();
    const editForm = document.getElementById('ResultEditForm');
    if (editForm.usedMetrics.value !== "") {
      const data = new FormData();
      data.append('id', editForm.id.value);
      data.append('usedMetrics', editForm.usedMetrics.value);
      data.append('resultdate', editForm.resultdate.value);
      data.append('measurementMetrics', editForm.measurementMetrics.value);
      data.append('weather', editForm.weather.value);
      data.append('resultDetails', editForm.resultDetails.value);
      this.props.mappedEditResult(data);
    }
    else {
      return;
    }
  }


  render() {

    // these values changes according to the state - keep that in mind!
    const buildingState = this.props.mappedBuildingState;
    const addedResult = buildingState.addedResult;
    const results = buildingState.results;
    const resultToEdit = buildingState.resultToEdit;
    const appState = this.props.mappedAppState;
    var canEdit = false;
    if (appState.kc.keycloak.realmAccess) {
      canEdit = appState.kc.keycloak.realmAccess.roles.indexOf('editor') > -1 ||
        appState.kc.keycloak.realmAccess.roles.indexOf('admin') > -1;
    }

    return (
      <div className="resultsDetail">
        {!buildingState.calcPoint && buildingState.isFetching &&
          <div>
            <p>Ladataan....</p>
          </div>
        }

        {buildingState.calcPoint && !buildingState.isFetching &&
          <div>
             {buildingState.building &&
              <Link to ={`/${buildingState.building._id}`}>Takaisin rakennuksen tietoihin</Link>
             }
            <h4>Mittauspaikan <b>{buildingState.calcPoint.shortDesc}</b> tulokset:</h4>
            <hr />
            <p><Button type="button" className="btn btn-primary" bsStyle="success" onClick={this.showAddResultModal} bsSize="small"><Glyphicon glyph="plus" />Lisää uusi mittaustulos</Button></p>

            {!results && buildingState.isFetching &&
              <p>Ladataan tietoa rakennuksista....</p>
            }
            {results && results.length <= 0 && !buildingState.isFetching &&
              <p>Ei kohteita saatavilla.</p>
            }
            {results && results.length > 0 && !buildingState.isFetching &&
              <table className="table vocTable">
                <thead>
                  <tr><th>Mittauksen ajankohta</th>
                    <th>Sää</th>
                    <th>Tulokset</th>
                    <th>Käytetty mittalaite</th>
                    <th>Lisätiedot</th>
                    {canEdit &&
                      <th className="textCenter">Muokkaa</th>
                    }
                    {canEdit &&
                      <th className="textCenter">Poista kohde</th>
                    }
                    <th className="textCenter">Tiedostot</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, i) => <tr key={i}>
                    <td className="textCenter">{result.resultdate && new Date(result.resultdate).toLocaleDateString('fi-FI')}</td>
                    <td>{result.weather}</td>
                    <td>{getLabelFor('measurementMetrics', result.measurementMetrics)}</td>
                    <td>{getLabelFor('usedMetrics', result.usedMetrics)}</td>
                    <td>{result.resultDetails}</td>
                    {canEdit &&
                      <td className="textCenter"><Button onClick={() => this.showEditResultModal(result)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="edit" /></Button></td>
                    }
                    {canEdit &&
                      <td className="textCenter"><Button onClick={() => this.showDeleteResultModal(result)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button></td>
                    }

                    <td className="textCenter">
                      {canEdit &&
                        <Button onClick={() => this.showFileUploadModal(result._id)} bsStyle="success" bsSize="xsmall"><Glyphicon glyph="plus" /> Lisää tiedosto</Button>
                      }
                      {canEdit &&
                        <br />
                      }
                      {result.files.map((file, ix) =>
                        <span key={ix}>
                          <a href="true" onClick={(e) => { e.preventDefault(); this.downloadFile(file._id, file.originalname) }} style={{ cursor: 'pointer' }}>{file.originalname}</a>
                          {canEdit &&
                          <span>&nbsp;
                            <Button onClick={() => this.showFileEditModal(file)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="edit" /></Button>
                            <Button onClick={() => this.showFileDeleteModal(file)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button>
                          </span>
                          }
                          <br />
                        </span>
                      )}
                    </td>
                  </tr>)
                  }
                </tbody>
              </table>
            }

          </div>
        }

        <Modal
          show={buildingState.showAddResultModal}
          onHide={this.hideAddResultModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >

          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Lisää uusi mittaustulos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">
              {buildingState.showAddResultModal &&
                <ResultAddForm calcPointId={buildingState.calcPoint._id} addResult={this.submitAddResult} />
              }

              {addedResult && buildingState.isFetching &&
                <Alert bsStyle="info">
                  <strong>Päivitetään...... </strong>
                </Alert>
              }
              {addedResult && !buildingState.isFetching && buildingState.error &&
                <Alert bsStyle="danger">
                  <strong>Epäonnistui. {buildingState.error} </strong>
                </Alert>
              }
              {addedResult && buildingState.successMsg &&
                <Alert bsStyle="success">
                  {buildingState.successMsg}
                </Alert>
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideAddResultModal}>Sulje</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for editing result for calcpoint*/}
        <Modal
          show={buildingState.showEditResultModal}
          onHide={this.hideEditResultModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >

          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Muokkaa mittaustulosta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">

              {resultToEdit && buildingState.showEditResultModal &&
                <ResultEditForm resultToEdit={resultToEdit} editResult={this.submitEditResult} />
              }

              {resultToEdit && buildingState.isFetching &&
                <Alert bsStyle="info">
                  <strong>Päivitetään...... </strong>
                </Alert>
              }
              {resultToEdit && !buildingState.isFetching && buildingState.error &&
                <Alert bsStyle="danger">
                  <strong>Epäonnistui. {buildingState.error} </strong>
                </Alert>
              }
              {resultToEdit && buildingState.successMsg &&
                <Alert bsStyle="success">
                  <strong>Mittaustulos </strong>{buildingState.successMsg}
                </Alert>
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideEditResultModal}>Sulje</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for deleting building */}
        <Modal
          show={buildingState.showDeleteResultModal}
          onHide={this.hideDeleteResultModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Poista mittaustulos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {buildingState.resultToDelete && !buildingState.error && !buildingState.isFetching &&
              <Alert bsStyle="warning">
                Oletko varma, että haluat poistaa mittaustuloksen?
              </Alert>
            }
            {buildingState.resultToDelete && buildingState.error &&
              <Alert bsStyle="warning">
                Epäonnistui. <strong>{buildingState.error} </strong>
              </Alert>
            }

            {buildingState.resultToDelete && !buildingState.error && buildingState.isFetching &&
              <Alert bsStyle="success">
                <strong>Poistetaan.... </strong>
              </Alert>
            }

            {!buildingState.resultToDelete && !buildingState.error && !buildingState.isFetching &&
              <Alert bsStyle="success">
                Mittaustulos <strong>{buildingState.successMsg} </strong>
              </Alert>
            }
          </Modal.Body>
          <Modal.Footer>
            {!buildingState.successMsg && !buildingState.isFetching &&
              <div>
                <Button onClick={this.confirmDeleteResult}>Kyllä</Button>
                <Button onClick={this.hideDeleteResultModal}>Ei</Button>
              </div>
            }
            {buildingState.successMsg && !buildingState.isFetching &&
              <Button onClick={this.hideDeleteResultModal}>Sulje</Button>
            }
          </Modal.Footer>
        </Modal>

        {
          /**
            FILE RELATED MODALS - TODO: HOW TO MAKE THEM REUSABLE?

            DUPLICATES IN Buildings.js
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
                  {buildingState.successMsg} mittauspaikalle.
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
                  {buildingState.successMsg} mittauspaikalle.
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
