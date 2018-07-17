import React from 'react';
import { Alert, Glyphicon, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import BuildingEditForm from './BuildingEditForm';

export default class Buildings extends React.Component {
  constructor(props) {
    super(props);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.submitEditBuilding = this.submitEditBuilding.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.cofirmDeleteBuilding = this.cofirmDeleteBuilding.bind(this);
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
    if (editForm.todoText.value !== "") {

      const data = new FormData();
      data.append('id', editForm.id.value);
      data.append('todoText', editForm.todoText.value);
      data.append('buildingType', editForm.buildingType.value);
      data.append('todoDesc', editForm.todoDesc.value);
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

  render() {
    const buildingState = this.props.mappedBuildingState;
    const buildings = buildingState.buildings;
    const editBuilding = buildingState.buildingToEdit;
    return (
      <div className="col-md-12">
        <h3 className="centerAlign">Kaikki kohteet</h3>
        {!buildings && buildingState.isFetching &&
          <p>Ladataan tietoa rakennuksista....</p>
        }
        {buildings.length <= 0 && !buildingState.isFetching &&
          <p>Ei kohteita saatavilla.</p>
        }
        {buildings && buildings.length > 0 && !buildingState.isFetching &&
          <table className="table booksTable">
            <thead>
              <tr><th>Rakennuksen tyyppi</th><th>Kunta</th><th className="textCenter">Muokkaa</th><th className="textCenter">Näytä</th><th className="textCenter">Poista kohde</th></tr>
            </thead>
            <tbody>
              {buildings.map((building, i) => <tr key={i}>
                <td>{building.buildingType}</td>
                <td>{building.kuntaText}</td>
                <td className="textCenter"><Button onClick={() => this.showEditModal(building)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="pencil" /></Button></td>
                <td className="textCenter"><Link to={`/${building._id}`}>Lisätiedot</Link> </td>
                <td className="textCenter"><Button onClick={() => this.showDeleteModal(building)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button></td>
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
                  Kohde <strong> {editBuilding.todoText} </strong>{buildingState.successMsg}
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
                Oletko varma, että haluat poistaa kohteen <strong>{buildingState.buildingToDelete.todoText} </strong> ?
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
      </div>
    );
  }
}
