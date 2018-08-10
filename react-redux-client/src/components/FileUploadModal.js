// import React from 'react';
// import { Alert, Glyphicon, Button, Modal } from 'react-bootstrap';
// import FileUploadForm from './FileUploadForm';
// import { buildingReducer } from '../reducers/buildingReducer';

// class FileUploadModal extends buildingReducer {
//     render() {
//     const buildingState = this.props.mappedBuildingState;

//     return <Modal
//             show={buildingState.showFileUploadModal}
//             onHide={this}
//             container={this}
//             aria-labelledby="contained-modal-title"
//         >

//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title">Tiedosto</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div className="col-md-12">
//                     {buildingState.showFileUploadModal &&
//                         <FileUploadForm fileParent={this.fileParent} />

//                     }

//                     {/* {calcPointToAdd && buildingState.isFetching &&
//         <Alert bsStyle="info">
//             <strong>Päivitetään...... </strong>
//         </Alert>
//         }
//         {calcPointToAdd && !buildingState.isFetching && buildingState.error &&
//         <Alert bsStyle="danger">
//             <strong>Epäonnistui. {buildingState.error} </strong>
//         </Alert>
//         }
//         {calcPointToAdd && buildingState.successMsg &&
//         <Alert bsStyle="success">
//             Kohde <strong> {calcPointToAdd.todoText} </strong>{buildingState.successMsg}
//         </Alert>
//         } */}
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={this}>Sulje</Button>
//             </Modal.Footer>
//         </Modal>
//     }
  
// };


// export default FileUploadModal;
