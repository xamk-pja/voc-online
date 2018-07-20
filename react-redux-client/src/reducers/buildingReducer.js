// ./react-redux-client/src/reducers/buildingReducer.js
const INITIAL_STATE = {
  buildings: [],
  building: null,
  calcPoints: [],
  isFetching: false,
  error: null,
  successMsg: null,
  showDeleteModal: false,
  buildingToDelete: null,
  showEditModal: false,
  buildingToEdit: null,
  newBuilding: null,
  showCalcPointEditModal: false,
  calcPointToAdd: null,
  calcPointToEdit: null,
  addCalcPointModal: false
}

export const buildingReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_BUILDINGS_REQUEST':
      return {
        ...currentState,
        buildings: [],
        building: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        showCalcPointEditModal: false
      }

    case 'FETCH_BUILDINGS_SUCCESS':
      return {
        ...currentState,
        buildings: action.buildings,
        building: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        showCalcPointEditModal: false
      }

    case 'FETCH_BUILDINGS_FAILED':
      return {
        ...currentState,
        buildings: [],
        building: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        showCalcPointEditModal: false
      }

    case 'FETCH_BUILDING_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        showCalcPointEditModal: false
      }

    case 'FETCH_BUILDING_SUCCESS':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: action.building,
        calcPoints: action.building.calcPoints,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        showCalcPointEditModal: false
      }

    case 'FETCH_BUILDING_FAILED':
      return {
        ...currentState,
        buildings: [],
        building: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        showCalcPointEditModal: false
      }

    case 'ADD_NEW_BUILDING_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: action.building,
        showCalcPointEditModal: false
      }

    case 'ADD_NEW_BUILDING_REQUEST_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: true,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false
      }

    case 'ADD_NEW_BUILDING_REQUEST_SUCCESS':
      const nextState = {
        ...currentState,
        buildings: [...currentState.buildings, action.building],
        building: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: action.building,
        showCalcPointEditModal: false
      }
      return nextState;

    case 'SHOW_EDIT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: true,
        buildingToEdit: action.building,
        newBuilding: null,
        showCalcPointEditModal: false
      }

    case 'HIDE_EDIT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false
      }

    case 'EDIT_BUILDING_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: true,
        buildingToEdit: action.building,
        newBuilding: null,
        showCalcPointEditModal: false
      }

    case 'EDIT_BUILDING_SUCCESS':
      const updatedBuildings = currentState.buildings.map((building) => {
        if (building._id !== action.building._id) {
          //This is not the item we care about, keep it as is
          return building;
        }
        //Otherwise, this is the one we want to return an updated value
        return { ...building, ...action.building }
      })
      return {
        ...currentState,
        buildings: updatedBuildings,
        building: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: true,
        buildingToEdit: action.building,
        newBuilding: null,
        showCalcPointEditModal: false
      }

    case 'EDIT_BUILDING_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: true,
        buildingToEdit: currentState.buildingToEdit,
        newBuilding: null,
        showCalcPointEditModal: false
      }

    case 'DELETE_BUILDING_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: true,
        buildingToDelete: action.building,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false
      }

    case 'DELETE_BUILDING_SUCCESS':
      const filteredBuildings = currentState.buildings.filter((building) => building._id !== currentState.buildingToDelete._id)
      return {
        ...currentState,
        buildings: filteredBuildings,
        building: null,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: true,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false
      }


    case 'DELETE_BUILDING_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: true,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false
      }

    case 'SHOW_DELETE_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: true,
        buildingToDelete: action.building,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false
      }

    case 'HIDE_DELETE_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: null,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false

      }

    /* CALC POINTS */



    case 'ADD_CP_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: true,
        showCalcPointEditModal: false,
        calcPointToAdd: null,
        addCalcPointModal: true
    }

    case 'HIDE_CP_ADD_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showAddCalcPointModal: false,
        showEditCalcPointModal: false,
        calcPointToAdd: null,
        addCalcPointModal: false
    }

    case 'HIDE_CP_EDIT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: false,
        showCalcPointEditModal: false,
        calcPointToAdd: null,
        addCalcPointModal: false
    }

    case 'ADD_NEW_CP_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: true,
        showCalcPointEditModal: false,
        showCalcPointDeleteModal: false,
        calcPointToAdd: action.calcPoint
      }


    case 'ADD_NEW_CP_REQUEST_SUCCESS':
      const cur = currentState.calcPoints;
      var points = cur.map((el) => {
        return el; 
      });
      points.push(action.calcPoint);

      const updatedCalcPoints = points;
      
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: updatedCalcPoints,
        isFetching: false,
        error: null,
        successMsg: action.successMsg,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: true,
        showCalcPointEditModal: false,
        calcPointToAdd: action.calcPoint
      }

    case 'ADD_NEW_CP_REQUEST_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints : currentState.calcPoints,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: true,
        showCalcPointEditModal: false,
        calcPointToAdd: action.cp,
      }


    case 'EDIT_CP_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints : currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: false,
        showCalcPointEditModal: true,
        calcPointToEdit: action.calcPointToEdit
      }


    case 'EDIT_CP_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints : currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: false,
        showCalcPointEditModal: true,
        calcPointToEdit: action.calcPointToEdit
      }


    case 'EDIT_CP_SUCCESS':
      const current = currentState.calcPoints;
      var points2 = current.map((rel) => {
        if (rel._id === action.calcPointToEdit._id ) {
          return action.calcPointToEdit;
        }
        return rel; 
      });
      const updatedCp = points2;
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints : updatedCp,
        isFetching: false,
        error: null,
        successMsg: action.successMsg,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: false,
        showCalcPointEditModal: true,
        calcPointToEdit: action.calcPointToEdit
      }

    case 'EDIT_CP_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints : currentState.calcPoints,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: false,
        showCalcPointEditModal: true,
        calcPointToEdit: action.calcPointToEdit
    }

    case 'DELETE_CP_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints : currentState.calcPoints,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: false,
        showCalcPointEditModal: false,
        showCalcPointDeleteModal : true,
        calcPointToDelete : action.calcPoint
      }

    case 'DELETE_CP_SUCCESS':
      const filteredCp = currentState.calcPoints.filter((cp) => cp._id !== currentState.calcPointToDelete._id)
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints : filteredCp,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showDeleteModal: true,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: false,
        showCalcPointEditModal: false,
        showCalcPointDeleteModal : false,  
        calcPointToDelete : null
      }


    case 'DELETE_CP_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints : currentState.calcPoints,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: true,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: false,
        showCalcPointEditModal: false,
        showCalcPointDeleteModal: true,
        calcPointToDelete : null
      }

    case 'SHOW_DELETE_CP_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints : currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: true,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: false,
        showCalcPointEditModal: false,
        showCalcPointDeleteModal: true,
        calcPointToDelete: action.calcPointToDelete
      }

    case 'HIDE_DELETE_CP_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints : currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointAddModal: false,
        showCalcPointEditModal: false,
        showCalcPointDeleteModal: false,
        calcPointToDelete: null
    }


    default:
      return currentState;

  }
}
