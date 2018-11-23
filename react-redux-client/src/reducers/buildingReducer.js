// ./react-redux-client/src/reducers/buildingReducer.js

/**
 * Redux reducer for building data
 * 
 * This class SHOULD BE REFACTORED and it's now massive because it contains all the states that buildings...
 * It keeps up the state in the browser for objects mapped here. 
 * 
 * TIP: use ReduxDevTools in Chrome browser to visualize this data on actual running instance.
 */

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
  addCalcPointModal: false,
  showFileUploadModal: false,
  fileParent: null,
  showFileEditModal: false,
  fileToEdit: null,
  showFileDeleteModal: false,
  fileToDelete: null
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
        calcPoints: currentState.calcPoints,
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
        showCalcPointEditModal: true,
        calcPointToEdit: action.calcPointToEdit
      }


    case 'EDIT_CP_REQUEST':
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
        showCalcPointEditModal: true,
        calcPointToEdit: action.calcPointToEdit
      }


    case 'EDIT_CP_SUCCESS':
      const current = currentState.calcPoints;
      var points2 = current.map((rel) => {
        if (rel._id === action.calcPointToEdit._id) {
          return action.calcPointToEdit;
        }
        return rel;
      });
      const updatedCp = points2;
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: updatedCp,
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
        calcPoints: currentState.calcPoints,
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
        calcPoints: currentState.calcPoints,
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
        showCalcPointDeleteModal: true,
        calcPointToDelete: action.calcPoint
      }

    case 'DELETE_CP_SUCCESS':
      const filteredCp = currentState.calcPoints.filter((cp) => cp._id !== currentState.calcPointToDelete._id)
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: filteredCp,
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
        showCalcPointDeleteModal: false,
        calcPointToDelete: null
      }


    case 'DELETE_CP_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
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
        calcPointToDelete: null
      }

    case 'SHOW_DELETE_CP_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
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
        showCalcPointDeleteModal: false,
        calcPointToDelete: null
      }


    /**
    * MEASUREMENTS FOR CALCPOINTS
    * 
    */


    case 'FETCH_RESULTS_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        isFetching: true,
        error: null,
        successMsg: null,
        calcPoint: currentState.calcPoint
      }

    case 'FETCH_RESULTS_SUCCESS':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        isFetching: false,
        error: null,
        successMsg: action.message,
        calcPoint: action.calcPoint,
        results: action.results
      }

    case 'FETCH_RESULTS_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        isFetching: false,
        error: action.error,
        successMsg: null,
        calcPoint: currentState.calcPoint,
        results: currentState.results
      }
    case 'SHOW_ADD_RESULT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showAddResultModal: true,
        calcPoint: currentState.calcPoint,
        results: currentState.results
      }

    case 'ADD_NEW_RESULT_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: true,
        error: null,
        successMsg: null,
        showAddResultModal: true,
        calcPoint: currentState.calcPoint,
        addedResult: action.addedResult,
        results: currentState.results
      }
    case 'ADD_NEW_RESULT_REQUEST_SUCCESS':
      // update cache for file added to be visible on main listing
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: action.successMsg,
        showAddResultModal: true,
        addedResult: action.addedResult,
        calcPoint: currentState.calcPoint,
        results: [...currentState.results, action.addedResult]
      }
    case 'ADD_NEW_RESULT_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showAddResultModal: true,
        calcPoint: currentState.calcPoint,
        results: currentState.results
      }

    case 'HIDE_ADD_RESULT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showAddResultModal: false,
        calcPoint: currentState.calcPoint,
        fileParent: null,
        results: currentState.results
      }


    /**
     * Edit result
     */

    case 'SHOW_EDIT_RESULT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showEditResultModal: true,
        calcPoint: currentState.calcPoint,
        results: currentState.results,
        resultToEdit: action.resultToEdit
      }

    case 'HIDE_EDIT_RESULT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showEditResultModal: false,
        calcPoint: currentState.calcPoint,
        fileParent: null,
        results: currentState.results
      }

    case 'EDIT_RESULT_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: true,
        error: null,
        successMsg: null,
        showEditResultModal: true,
        calcPoint: currentState.calcPoint,
        resultToEdit: currentState.resultToEdit,
        results: currentState.results
      }
    case 'EDIT_RESULT_SUCCESS':
      // update cache for file added to be visible on main listing
      const updatedResults = currentState.results.map((result) => {
        if (result._id !== action.result._id) {
          //This is not the item we care about, keep it as is
          return result;
        }
        //Otherwise, this is the one we want to return an updated value
        return { ...result, ...action.result }
      })
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: action.message,
        showEditResultModal: true,
        addedResult: null,
        resultToEdit: action.result,
        calcPoint: currentState.calcPoint,
        results: updatedResults
      }
    case 'EDIT_RESULT_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showEditResultModal: true,
        calcPoint: currentState.calcPoint,
        results: currentState.results
      }

    /**
     * Delete result
     */

    case 'DELETE_RESULT_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: true,
        error: null,
        successMsg: null,
        calcPoint: currentState.calcPoint,
        results: currentState.results,
        resultToDelete: action.resultToDelete,
        showDeleteResultModal: true
      }

    case 'DELETE_RESULT_SUCCESS':
      const filteredResults = currentState.results.filter((r) => r._id !== currentState.resultToDelete._id)
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: filteredCp,
        isFetching: false,
        error: null,
        successMsg: action.message,
        calcPoint: currentState.calcPoint,
        resultToDelete: action.resultToDelete,
        results: filteredResults,
        showDeleteResultModal: true
      }


    case 'DELETE_RESULT_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: action.error,
        successMsg: null,
        calcPoint: currentState.calcPoint,
        results: currentState.results,
        showDeleteResultModal: false
      }

    case 'SHOW_DELETE_RESULT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        calcPoint: currentState.calcPoint,
        results: currentState.results,
        resultToDelete: action.resultToDelete,
        showDeleteResultModal: true
      }

    case 'HIDE_DELETE_RESULT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        calcPoint: currentState.calcPoint,
        results: currentState.results,
        resultToDelete: null,
        showDeleteResultModal: false
      }

    /**
     * 
     * MEASUREMENT RESULTS FOR CALCPOINTS ENDS
     */


    /**
     * FILE RELATED CACHE
     */

    case 'SHOW_FILE_UPLOAD_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: false,
        error: null,
        successMsg: null,
        showFileUploadModal: true,
        fileParent: action.fileParent
      }

    case 'ADD_NEW_FILE_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: true,
        error: null,
        successMsg: null,
        showFileUploadModal: true,
        fileParent: action.fileParent,
        file: action.file
      }
    case 'ADD_NEW_FILE_REQUEST_SUCCESS':
      // update cache for file added to be visible on main listing
      const fileUpdatedBuildings = currentState.buildings.map((building) => {
        if (building._id === action.fileParent._id) {
          building.files.push(action.file);

          console.log(action.file._id);

          return building;
        } else {
          return building;
        }
      })

      const fileUpdatedCalcPoints = currentState.calcPoints.map((cp) => {
        if (cp._id === action.fileParent._id) {
          cp.files.push(action.file);
          console.log(action.file._id);
          return cp;
        } else {
          return cp;
        }
      })
      var fileUpdatedResults = [];
      if (currentState.results) {
        fileUpdatedResults = currentState.results.map((result) => {
        if (result._id === action.fileParent._id) {
          result.files.push(action.file);

          console.log(action.file._id);

          return result;
        } else {
          return result;
        }
      })
    }
      return {
        ...currentState,
        buildings: fileUpdatedBuildings,
        building: currentState.building,
        calcPoints: fileUpdatedCalcPoints,
        results: fileUpdatedResults,
        isFetching: false,
        error: null,
        successMsg: action.successMsg,
        showFileUploadModal: true,
        fileParent: action.fileParent,
        file: action.file
      }
    case 'ADD_NEW_FILE_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: false,
        error: null,
        successMsg: null,
        showFileUploadModal: true,
        fileParent: action.fileParent
      }

    case 'HIDE_FILE_UPLOAD_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: false,
        error: null,
        successMsg: null,
        showFileUploadModal: false,
        fileParent: null
      }

    /**
     * FILE RELATED CACHE
     */

    case 'SHOW_FILE_EDIT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: false,
        error: null,
        successMsg: null,
        showFileEditModal: true,
        fileToEdit: action.fileToEdit
      }
    case 'HIDE_FILE_EDIT_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: false,
        error: null,
        successMsg: null,
        showFileEditModal: false,
        fileToEdit: null
      }

    case 'EDIT_FILE_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: true,
        error: null,
        successMsg: null,
        showFileEditModal: true,
        fileToEdit: action.fileToEdit
      }
    case 'EDIT_FILE_REQUEST_SUCCESS':
      // update cache for file added to be visible on main listing
      const fileUpdatedBuildingsEdit = currentState.buildings.map((building) => {
        if (building._id === action.fileParent) {
          const updatedFiles = building.files.map((file) => {
            if (file._id !== action.fileToEdit._id) {
              //This is not the item we care about, keep it as is
              return file;
            }
            //Otherwise, this is the one we want to return an updated value
            return { ...file, ...action.fileToEdit }
          })

          building.files = updatedFiles;
          return building;
        }
        return building
      })
      // this is again stupid to get the collection of updated objects in 3 separate same kind of functions
      const fileUpdatedCPsEdit = currentState.calcPoints.map((cp) => {
        if (cp._id === action.fileParent) {
          const updatedFiles = cp.files.map((file) => {
            if (file._id !== action.fileToEdit._id) {
              //This is not the item we care about, keep it as is
              return file;
            }
            //Otherwise, this is the one we want to return an updated value
            return { ...file, ...action.fileToEdit }
          })

          cp.files = updatedFiles;
          return cp;
        }
        return cp
      })
      // this is again stupid to get the collection of updated objects in 3 separate same kind of functions
      var fileUpdatedResultsEdit = [];
      if ( currentState.results) {
        fileUpdatedResultsEdit = currentState.results.map((result) => {
        if (result._id === action.fileParent) {
          const updatedFiles = result.files.map((file) => {
            if (file._id !== action.fileToEdit._id) {
              //This is not the item we care about, keep it as is
              return file;
            }
            //Otherwise, this is the one we want to return an updated value
            return { ...file, ...action.fileToEdit }
          })

          result.files = updatedFiles;
          return result;
        }
        return result
      })
      }

      return {
        ...currentState,
        buildings: fileUpdatedBuildingsEdit,
        building: currentState.building,
        calcPoints: fileUpdatedCPsEdit,
        results: fileUpdatedResultsEdit,
        isFetching: false,
        error: null,
        successMsg: action.successMsg,
        showFileEditModal: true,
        fileParent: action.fileParent,
        fileToEdit: action.fileToEdit
      }
    case 'EDIT_FILE_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: false,
        error: null,
        successMsg: null,
        showFileEditModal: true,
        fileParent: action.fileParent,
        fileToEdit: null
      }

    /**
     * FILE RELATED CACHE
     */

    case 'SHOW_FILE_DELETE_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: false,
        error: null,
        successMsg: null,
        showFileDeleteModal: true,
        fileToDelete: action.fileToDelete
      }
    case 'HIDE_FILE_DELETE_MODAL':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: false,
        error: null,
        successMsg: null,
        showFileDeleteModal: false,
        fileToDelete: null
      }

    case 'DELETE_FILE_REQUEST':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        calcPoints: currentState.calcPoints,
        results: currentState.results,
        isFetching: true,
        error: null,
        successMsg: null,
        showFileDeleteModal: true,
        fileToDelete: action.fileToDelete,
        file: action.file
      }
    case 'DELETE_FILE_REQUEST_SUCCESS':
      // update cache for file added to be visible on main listing
      var fileid = action.fileToDelete;
      var parentId = action.fileParent;

      // Filter removed file from building's files
      const fileRemoveUpdatedBuildings = currentState.buildings.map((building) => {
        if (building._id === parentId) {
          const filteredFiles = building.files.filter((f) => f._id !== fileid);
          building.files = filteredFiles;
          return building;
        } else {
          return building;
        }
      })

    // this is again stupid to get the collection of updated objects in 3 separate same kind of functions
    const fileUpdatedCPsDelete = currentState.calcPoints.map((cp) => {
      if (cp._id === parentId) {
        const updatedFiles = cp.files.filter((f) => f._id !== fileid);
        cp.files = updatedFiles;
        return cp;
      }
      return cp
    })

    // this is again stupid to get the collection of updated objects in 3 separate same kind of functions
    const fileUpdatedResultsDelete = currentState.results.map((r) => {
      if (r._id === parentId) {
        const updatedFiles = r.files.filter((f) => f._id !== fileid);
        r.files = updatedFiles;
        return r;
      }
      return r;
    })

      return {
        ...currentState,
        buildings: fileRemoveUpdatedBuildings,
        building: currentState.building,
        results: fileUpdatedResultsDelete,
        calcPoints: fileUpdatedCPsDelete,
        isFetching: false,
        error: null,
        successMsg: action.successMsg,
        showFileDeleteModal: true,
        fileToDelete: null
      }
    case 'DELETE_FILE_FAILED':
      return {
        ...currentState,
        buildings: currentState.buildings,
        building: currentState.building,
        results: currentState.results,
        calcPoints: currentState.calcPoints,
        isFetching: false,
        error: null,
        successMsg: null,
        showFileDeleteModal: true,
        fileParent: action.fileToDelete
      }
    default:
      return currentState;
  }
}


