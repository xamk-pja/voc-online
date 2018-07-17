import { connect } from 'react-redux';
import * as vocActions from '../actions/buildingActions';
import Buildings from '../components/Buildings';

// map state from store to props
const mapStateToProps = (state,ownProps) => {
  return {
    //you can now say this.props.mappedBuildingState
    mappedBuildingState: state.buildingState
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    fetchBuildings: () => dispatch(vocActions.fetchBuildings()),
    mappedEditBuilding: buildingToEdit => dispatch(vocActions.editBuilding(buildingToEdit)),
    mappedshowEditModal: buildingToEdit => dispatch(vocActions.showEditModal(buildingToEdit)),
    mappedhideEditModal: () => dispatch(vocActions.hideEditModal()),
    mappedDeleteBuilding: buildingToDelete => dispatch(vocActions.deleteBuilding(buildingToDelete)),
    mappedshowDeleteModal: buildingToDelete => dispatch(vocActions.showDeleteModal(buildingToDelete)),
    mappedhideDeleteModal: () => dispatch(vocActions.hideDeleteModal())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Buildings);
