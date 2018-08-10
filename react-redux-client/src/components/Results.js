/*
Page for singe building information selected from the main table

*/

import React from 'react';
import { Alert, Glyphicon, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router';

import ResultAddForm from './ResultAddForm';
import ResultEditForm from './ResultEditForm';
import { getLabelFor } from './utils.js';
import { browserHistory } from 'react-router';

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

  submitAddResult(e) {
    e.preventDefault();
    const addResultForm = document.getElementById('ResultAddForm');
    if (addResultForm.parentId.value !== "") {
      const data = new FormData();
      data.append('parentId', addResultForm.parentId.value);
      data.append('usedMetrics', addResultForm.usedMetrics.value);
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
      this.props.mappedEditResult(data);
    }
    else {
      return;
    }
  }


  render() {

    // these values changes according to the state - keep that in mind!
    const buildingState = this.props.mappedBuildingState;
    const calcPoint = buildingState.calcPoint;
    const addedResult = buildingState.addedResult;
    const results = buildingState.results;
    const resultToEdit = buildingState.resultToEdit;
    const building = buildingState.building;

    return (
      <div className="resultsDetail">
        {!buildingState.calcPoint && buildingState.isFetching &&
          <div>
            <p>Ladataan....</p>
          </div>
        }
        <button onClick={browserHistory.goBack}>Takaisin rakennuksen tietoihin</button>

        {buildingState.calcPoint && !buildingState.isFetching &&
          <div>
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
              <table className="table booksTable">
                <thead>
                  <tr><th>Käytetty mittalaite</th><th className="textCenter">Näytä</th><th className="textCenter">Muokkaa</th><th className="textCenter">Poista kohde</th><th className="textCenter">Tiedostot</th></tr>
                </thead>
                <tbody>
                  {results.map((result, i) => <tr key={i}>
                    <td>{getLabelFor('usedMetrics', result.usedMetrics)}</td>
                    <td className="textCenter"><Link to={`/${result._id}`}>TODO</Link> </td>
                    <td className="textCenter"><Button onClick={() => this.showEditResultModal(result)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="pencil" /></Button></td>
                    <td className="textCenter"><Button onClick={() => this.showDeleteResultModal(result)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button></td>
                    <td className="textCenter"><Button onClick={() => this.showFileUploadModal(result._id)} bsStyle="success" bsSize="xsmall"><Glyphicon glyph="plus" /> Lisää tiedosto</Button>
                      <br />
                      {result.files.map((file, i) =>
                        <span>
                          <a href="#" onClick={() => this.downloadFile(file._id)}>{file.originalname}</a><span>&nbsp;
                      <Button onClick={() => this.showFileEditModal(file)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="plus" /></Button>
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
                  Kohde <strong> {addedResult._id} </strong>{buildingState.successMsg}
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
                  <strong> {resultToEdit._id} </strong>{buildingState.successMsg}
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
                Oletko varma, että haluat poistaa mittaustuloksen <strong>{buildingState.resultToDelete._id} </strong> ?
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

      </div>
    );
  }
}
