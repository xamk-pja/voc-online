import { connect } from 'react-redux';
import * as vocActions from '../actions/buildingActions';
import Building from '../components/Building';

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
    mappedfetchBuildingById: bid => dispatch(vocActions.fetchBuildingById(bid)),
    mappedEditBuildingCalcPoint: bid => dispatch(vocActions.editBuildingCalcPoint(bid)),
    addCalcPointModal: () => dispatch(vocActions.addCalcPointModal()),
    mappedAddCalcPoint: calcPoint => dispatch(vocActions.addNewCalcPoint(calcPoint)),
    mappedhideCPModal: () => dispatch(vocActions.hideCPEditModal()),
    // mappedDeleteBuilding: bid => dispatch(vocActions.deleteBuilding(bid)),
    // mappedshowDeleteModal: bid => dispatch(vocActions.showDeleteModal(bid)),
    // mappedhideDeleteModal: () => dispatch(vocActions.hideDeleteModal())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Building);
