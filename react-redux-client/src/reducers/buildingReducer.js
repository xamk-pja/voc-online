// ./react-redux-client/src/reducers/buildingReducer.js
const INITIAL_STATE = {
  buildings: [],
  building: null,
  isFetching: false,
  error: null,
  successMsg: null,
  showDeleteModal: false,
  buildingToDelete: null,
  showEditModal: false,
  buildingToEdit: null,
  newBuilding: null,
  showCalcPointEditModal: false,
  buildingCalcPointToEdit: null,
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


    case 'ADD_CALC_POINT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false,
        buildingCalcPointToEdit: null,
        addCalcPointModal: true
    }

    case 'HIDE_CALC_POINT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false,
        buildingCalcPointToEdit: null,
        addCalcPointModal: false
    }

    case 'ADD_NEW_CP_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        isFetching: true,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: true,
        buildingCalcPointToEdit: action.cp
      }


    case 'ADD_NEW_CP_REQUEST_SUCCESS':
      // const updatedCalcPoints = currentState.building.map((calcPoint) => {
      //   if (calcPoint._id !== action.calcPoint._id) {
      //     //This is not the item we care about, keep it as is
      //     return calcPoint;
      //   }
      //   //Otherwise, this is the one we want to return an updated value
      //   return { ...calcPoint, ...action.building.calcPoint }
      // })

      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: [...currentState.building.calcPoint, action.calcPoint],
        isFetching: false,
        error: null,
        successMsg: action.successMsg,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: true,
        buildingCalcPointToEdit: null
      }

    case 'ADD_NEW_CP_REQUEST_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false,
        buildingCalcPointToEdit: null,
      }


    case 'EDIT_CALC_POINT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: true,
        buildingCalcPointToEdit: null
      }


    case 'EDIT_BUILDING_CALC_POINT_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        isFetching: false,
        error: null,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: true,
        buildingCalcPointToEdit: action.cp
      }


    case 'EDIT_BUILDING_CALC_POINT_SUCCESS':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: [...currentState.building.calcPoint, action.calcPoint],
        isFetching: false,
        error: null,
        successMsg: action.successMsg,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: true,
        buildingCalcPointToEdit: null
      }

    case 'EDIT_BUILDING_CALC_POINT_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        isFetching: false,
        error: action.error,
        successMsg: null,
        showDeleteModal: false,
        buildingToDelete: null,
        showEditModal: false,
        buildingToEdit: null,
        newBuilding: null,
        showCalcPointEditModal: false,
        buildingCalcPointToEdit: null,
      }

    default:
      return currentState;

  }
}
