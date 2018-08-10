import { connect } from 'react-redux';
import * as resultsActions from '../actions/resultsActions';
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
    mappedDeleteResult: (result) => dispatch(resultsActions.deleteResult(result))

    // mappedfetchBuildingById: bid => dispatch(vocActions.fetchBuildingById(bid)),
    // mappedEditBuildingCalcPoint: bid => dispatch(vocActions.editBuildingCalcPoint(bid)),
    // addCalcPointModal: () => dispatch(vocActions.addCalcPointModal()),
    // mappedhideCPModal: () => dispatch(vocActions.hideCalcPointEditModal()),
    // mappedDeleteBuilding: bid => dispatch(vocActions.deleteBuilding(bid)),
    // mappedshowDeleteModal: bid => dispatch(vocActions.showDeleteModal(bid)),
    // mappedhideDeleteModal: () => dispatch(vocActions.hideDeleteModal())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Results);
