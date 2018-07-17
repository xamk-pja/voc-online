/*
Page for singe building information selected from the main table

*/

import React from 'react';
import { Alert, Glyphicon, Button, Modal } from 'react-bootstrap';
import CalcPointAddForm from "./CalcPointAddForm";

export default class Building extends React.Component {
  constructor(props) {
    super(props);

    this.addCalcPointModal = this.addCalcPointModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);

    this.addCalcPoint = this.addCalcPoint.bind(this);

    
    // this.cofirmDeleteBuilding = this.cofirmDeleteBuilding.bind(this);

  }

  componentDidMount() {
    this.props.mappedfetchBuildingById(this.props.params.id);
  }

  addCalcPointModal() {
    this.props.addCalcPointModal();
  }

  hideEditModal() {
    this.props.mappedhideCPModal();
  }

  addCalcPoint(e) {
    e.preventDefault();
    const editForm = document.getElementById('CalcPointAddForm');
    if (editForm.shortDesc.value !== "") {

      const data = new FormData();
      data.append('shortDesc', editForm.shortDesc.value);
      data.append('longDesc', editForm.longDesc.value);
      data.append('parent', this.props.params.id);

      this.props.mappedAddCalcPoint(data);
    }
    else {
      return;
    }
  }

  // openCPModal = () => {
  //   this.setState({ modalIsOpen: true });
  // }

  // closeCPModal = () => {
  //   this.setState({ modalIsOpen: false });
  // }

  // handleModalCloseRequest = () => {
  //   // opportunity to validate something and keep the modal open even if it
  //   // requested to be closed
  //   this.setState({modalIsOpen: false});
  // }


  render() {
    const buildingState = this.props.mappedBuildingState;

    return (
      <div className="buildingDetail">
        <h2>Rakennuksen tiedot</h2>
        {!buildingState.building && buildingState.isFetching &&
          <div>
            <p>Ladataan....</p>
          </div>
        }
        {buildingState.building && !buildingState.isFetching &&
          <div>
            <h3>{buildingState.building.todoText}</h3>
            <p><b>Rakennuksen lisätieto: </b>{buildingState.building.todoDesc}</p>
            <p><b>Rakennuksen tyyppi: </b>{buildingState.building.buildingType}</p>
            <p><b>Rakennuksen ID: </b>{buildingState.building._id}</p>

            <p>Lisää uusi mittauspaikka: <Button type="button" className="btn btn-primary" onClick={this.addCalcPointModal}><Glyphicon glyph="pencil" /></Button></p>

            {buildingState.building.calcPoint && 
              <table className="table booksTable">
              <thead>
                <tr><th>Mittauspaikan nimi</th><th>Lisätieto</th><th className="textCenter">Muokkaa</th><th className="textCenter">Näytä</th><th className="textCenter">Poista kohde</th></tr>
              </thead>
              <tbody>
                {buildingState.building.calcPoint.map((calcPoint, i) => <tr key={i}>
                  <td>{calcPoint.shortDesc}</td>
                  <td>{calcPoint.longDesc}</td>
                  <td>{calcPoint._id}</td>

                  
                  {/* CONTINUE FROM HERE: implement edit and delete for calc points + then logic to add the actual results. <td className="textCenter"><Button onClick={() => this.showEditModal(building)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="pencil" /></Button></td>
                  <td className="textCenter"><Link to={`/${building._id}`}>Lisätiedot</Link> </td>
                  <td className="textCenter"><Button onClick={() => this.showDeleteModal(building)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button></td> */}
                </tr>)
                }
              </tbody>
            </table>
            }


            

            {/*Add new calc point with null id?*/}
            {/* <p><Button onClick={() => this.openCPModal()} bsStyle="new" bsSize="xsmall"><Glyphicon glyph="pencil" /></Button></p> */}



            {/*TODO: jatka tästä, ao:n pitäisi siis muokata valittuja calc pointteja, lisäys uupuu
          
          looppaa läpi olemassaolevien calcpointtien ja näytä editit niille ao. riveillä.*/}
            {/* <p><Button onClick={() => this.showCalcPointEditModal(buildingState.building.calcPoint)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="pencil" /></Button></p> */}


            {/* Modal for editing building */}
            <Modal
              show={buildingState.addCalcPointModal}
              onHide={this.hideEditModal}
              container={this}
              aria-labelledby="contained-modal-title"
            >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Lisää uusi mittauspaikka</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="col-md-12">
                    {buildingState.addCalcPointModal &&
                      <CalcPointAddForm addCalcPoint={this.addCalcPoint} />
                
                    }

                    {buildingState.isFetching &&
                      <Alert bsStyle="info">
                        <strong>Päivitetään...... </strong>
                      </Alert>
                    }
                    {!buildingState.isFetching && buildingState.error &&
                      <Alert bsStyle="danger">
                        <strong>Epäonnistui. {buildingState.error} </strong>
                      </Alert>
                    }
                    {buildingState.successMsg &&
                      <Alert bsStyle="success">
                        Kohde <strong> {this.addCalcPoint.shortDesc} </strong>{buildingState.successMsg}
                      </Alert>
                    }
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.hideEditModal}>Sulje</Button>
              </Modal.Footer>
            </Modal>

            
            <p>Lisää back-nappi ja muut tiedot</p>
          </div>
        }
      </div>
    );
  }
}
