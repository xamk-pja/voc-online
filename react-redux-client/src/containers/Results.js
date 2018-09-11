import { connect } from 'react-redux';
import * as resultsActions from '../actions/resultsActions';
import * as fileActions from '../actions/fileActions';
import Results from '../components/Results';

// map state from store to props
const mapStateToProps = (state) => {
  return {
    //you can now say this.props.mappedAppSate
    mappedBuildingState: state.buildingState
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    mappedFetchResultsById: rid => dispatch(resultsActions.fetchResultsForCalcPoint(rid)),
    mappedShowAddResultModal: () => dispatch(resultsActions.showAddResultModal()),
    mappedHideAddResultModal: () => dispatch(resultsActions.hideAddResultModal()),
    mappedAddResultForCalcPoint: calcPoint => dispatch(resultsActions.addResult(calcPoint)),
    mappedShowEditResultModal: (result) => dispatch(resultsActions.showEditResultModal(result)),
    mappedHideEditResultModal: () => dispatch(resultsActions.hideEditResultModal()),
    mappedEditResult: (result) => dispatch(resultsActions.editResult(result)),
    mappedShowDeleteResultModal: (resultToDelete) => dispatch(resultsActions.showDeleteResultModal(resultToDelete)),
    mappedHideDeleteResultModal: () => dispatch(resultsActions.hideDeleteResultModal()),
    mappedDeleteResult: (result) => dispatch(resultsActions.deleteResult(result)),

    mappedFileUploadModal: parentId => dispatch(fileActions.showFileUploadModal(parentId)),
    mappedHideFileUploadModal: () => dispatch(fileActions.hideFileUploadModal()),
    mappedFileEditModal: fileToEdit => dispatch(fileActions.showFileEditModal(fileToEdit)),
    mappedHideFileEditModal: () => dispatch(fileActions.hideFileEditModal()),
    mappedShowFileDeleteModal: fileToDelete => dispatch(fileActions.showFileDeleteModal(fileToDelete)),
    mappedHideFileDeleteModal: () => dispatch(fileActions.hideFileDeleteModal()),
    mappedDeleteFile: fileToDelete => dispatch(fileActions.deleteFile(fileToDelete)),
    mappedFileUpload: file => dispatch(fileActions.fileUpload(file)),
    mappedFileEdit: file => dispatch(fileActions.fileEdit(file))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Results);
