// ./react-redux-client/src/actions/vocActions.js

// Actions makes the API calls to the Node backend

const apiUrl = "/api/";

export const toggleAddBuilding = () => {
  return {
    type: 'TOGGLE_ADD_BUILDING'
  }
}
//Async action for adding building
export const addNewBuilding = (building) => {
  // Returns a dispatcher function
  // that dispatches an action at later time
  return (dispatch) => {
    dispatch(addNewBuildingRequest(building));
    return fetch(apiUrl, {
      method: 'post',
      body: building,
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data.building);
          dispatch(addNewBuildingRequestSuccess(data.building, data.message))
        })
      }
      else {
        response.json().then(error => {
          dispatch(addNewBuildingRequestFailed(error))
        })
      }
    })
  }
}

// Sync redux cache state for new building request
export const addNewBuildingRequest = (building) => {
  return {
    type: 'ADD_NEW_BUILDING_REQUEST',
    building
  }
}
// Sync redux cache state 
export const addNewBuildingRequestSuccess = (building, message) => {
  return {
    type: 'ADD_NEW_BUILDING_REQUEST_SUCCESS',
    building: building,
    message: message
  }
}
// Sync redux cache state 
export const addNewBuildingRequestFailed = (error) => {
  return {
    type: 'ADD_NEW_BUILDING_REQUEST_FAILED',
    error
  }
}

//Async action for fetching buildings
export const fetchBuildings = (userGroups) => {
  // Returns a dispatcher function
  // that dispatches an action at later time
  return (dispatch) => {
    dispatch(fetchBuildingsRequest(userGroups));
    // Returns a promise
    return fetch(apiUrl+"fetch/", {
      method: 'post',
      body: userGroups
    }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            dispatch(fetchBuildingsSuccess(data.buildings, data.message));
          })
        }
        else {
          response.json().then(error => {
            dispatch(fetchBuildingsFailed(error));
          })
        }
      })
  }
}
// Sync redux cache state 
export const fetchBuildingsRequest = (user) => {
  return {
    type: 'FETCH_BUILDINGS_REQUEST',
    user
  }
}


// Sync redux cache state 
export const fetchBuildingsSuccess = (buildings, message) => {
  return {
    type: 'FETCH_BUILDINGS_SUCCESS',
    buildings: buildings,
    message: message,
    receivedAt: Date.now
  }
}
// Sync redux cache state 
export const fetchBuildingsFailed = (error) => {
  return {
    type: 'FETCH_BUILDINGS_FAILED',
    error
  }
}

// Returns a promise for fetching a building by id
export const fetchBuildingById = (buildingId) => {
  return (dispatch) => {
    dispatch(fetchBuildingRequest());
    // Returns a promise
    return fetch(apiUrl + buildingId)
      .then(response => {
        console.log(response)
        if (response.ok) {
          response.json().then(data => {
            dispatch(fetchBuildingSuccess(data.building[0], data.message));
          })
        }
        else {
          response.json().then(error => {
            dispatch(fetchBuildingFailed(error));
          })
        }
      })

  }
}
// Sync redux cache state 
export const fetchBuildingRequest = () => {
  return {
    type: 'FETCH_BUILDING_REQUEST'
  }
}


// Sync redux cache state 
export const fetchBuildingSuccess = (building, message) => {
  return {
    type: 'FETCH_BUILDING_SUCCESS',
    building: building,
    message: message,
    receivedAt: Date.now
  }
}
// Sync redux cache state 
export const fetchBuildingFailed = (error) => {
  return {
    type: 'FETCH_BUILDING_FAILED',
    error
  }
}
// Sync redux cache state 
export const showEditModal = (buildingToEdit) => {
  return {
    type: 'SHOW_EDIT_MODAL',
    building: buildingToEdit
  }
}
// Sync redux cache state 
export const hideEditModal = () => {
  return {
    type: 'HIDE_EDIT_MODAL'
  }
}

// edit building async function
export const editBuilding = (building) => {
  return (dispatch) => {
    dispatch(editBuildingRequest(building));
    return fetch(apiUrl, {
      method: 'put',
      body: building
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(editBuildingSuccess(data.building, data.message));
        })
      }
      else {
        response.json().then(error => {
          dispatch(editBuildingFailed(error));
        })
      }
    })
  }
}
// Sync redux cache state 
export const editBuildingRequest = (building) => {
  return {
    type: 'EDIT_BUILDING_REQUEST',
    building
  }
}
// Sync redux cache state 
export const editBuildingSuccess = (building, message) => {
  return {
    type: 'EDIT_BUILDING_SUCCESS',
    building: building,
    message: message
  }
}
// Sync redux cache state 
export const editBuildingFailed = (error) => {
  return {
    type: 'EDIT_BUILDING_FAILED',
    error
  }
}
// Delete building async function
export const deleteBuilding = (building) => {
  return (dispatch) => {
    dispatch(deleteBuildingRequest(building));
    return fetch(apiUrl + building._id, {
      method: 'delete'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(deleteBuildingSuccess(data.message));
        })
      }
      else {
        response.json().then(error => {
          dispatch(deleteBuildingFailed(error));
        })
      }
    })

  }
}
// Sync redux cache state 
export const deleteBuildingRequest = (building) => {
  return {
    type: 'DELETE_BUILDING_REQUEST',
    building
  }
}
// Sync redux cache state 
export const deleteBuildingSuccess = (message) => {
  return {
    type: 'DELETE_BUILDING_SUCCESS',
    message: message
  }
}
// Sync redux cache state 
export const deleteBuildingFailed = (error) => {
  return {
    type: 'DELETE_BUILDING_FAILED',
    error
  }
}
// Sync redux cache state 
export const showDeleteModal = (buildingToDelete) => {
  return {
    type: 'SHOW_DELETE_MODAL',
    building: buildingToDelete
  }
}
// Sync redux cache state 
export const hideDeleteModal = () => {
  return {
    type: 'HIDE_DELETE_MODAL'
  }
}

// Add new calc point (mittauspaikka) for a buidling async action
export const addNewCalcPoint = (calcPoint) => {

  return (dispatch) => {
    dispatch(addNewCalcPointRequest(calcPoint));

    fetch(apiUrl + "/cp/" + calcPoint.get("parent"), {
      method: 'post',
      body: calcPoint,
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data);
          dispatch(addNewCalcPointRequestSuccess(data.newCalcPoint, data.message))
        })
      }
      else {
        response.json().then(error => {
          dispatch(addNewCalcPointRequestFailed(error))
        })
      }
    })
  }
}
// Sync redux cache state 
export const addNewCalcPointRequest = (calcPoint) => {
  return {
    type: 'ADD_NEW_CP_REQUEST',
    calcPoint
  }
}
// Sync redux cache state 
export const addNewCalcPointRequestSuccess = (calcPoint, message) => {
  return {
    type: 'ADD_NEW_CP_REQUEST_SUCCESS',
    calcPoint: calcPoint,
    successMsg: message
  }
}
// Sync redux cache state 
export const addNewCalcPointRequestFailed = (error) => {
  return {
    type: 'ADD_NEW_CP_REQUEST_FAILED',
    error
  }
}

// Edit calc point (mittauspaikka) for a building async action
export const editCalcPoint = (calcPointToEdit) => {
  return (dispatch) => {
    dispatch(editBuildingCalcPointRequest(calcPointToEdit));
    return fetch(apiUrl + "/cp/", {
      method: 'put',
      body: calcPointToEdit
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(editBuildingCalcPointSuccess(data.newCalcPoint, data.message));
        })
      }
      else {
        response.json().then(error => {
          dispatch(editBuildingCalcPointFailed(error));
        })
      }
    })
  }
}

// Sync redux cache state 
export const addCalcPointModal = () => {
  return {
    type: 'ADD_CP_MODAL'


  }
}
// Sync redux cache state 
export const hideCalcPointAddModal = () => {
  return {
    type: 'HIDE_CP_ADD_MODAL'
  }
}

// Sync redux cache state 
export const hideCalcPointEditModal = () => {
  return {
    type: 'HIDE_CP_EDIT_MODAL'
  }
}
// Sync redux cache state 
export const showCalcPointEditModal = (calcPointToEdit) => {
  return {
    type: 'EDIT_CP_MODAL',
    calcPointToEdit: calcPointToEdit
  }
}

// Sync redux cache state 
export const editBuildingCalcPointRequest = (calcPointToEdit) => {
  return {
    type: 'EDIT_CP_REQUEST',
    calcPointToEdit
  }
}
// Sync redux cache state 
export const editBuildingCalcPointSuccess = (calcPointToEdit, message) => {
  return {
    type: 'EDIT_CP_SUCCESS',
    calcPointToEdit: calcPointToEdit,
    successMsg: message
  }
}
// Sync redux cache state 
export const editBuildingCalcPointFailed = (error) => {
  return {
    type: 'EDIT_CP_FAILED',
    error
  }
}

// Delete calc point (mittauspaikka) from building async action
export const deleteCalcPoint = (calcPoint) => {
  return (dispatch) => {
    dispatch(deleteCalcPointRequest(calcPoint));
    return fetch(apiUrl + "/cp/" + calcPoint._id, {
      method: 'delete'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(deleteCalcPointSuccess(data.message));
        })
      }
      else {
        response.json().then(error => {
          dispatch(deleteCalcPointFailed(error));
        })
      }
    })

  }
}
// Sync redux cache state 
export const deleteCalcPointRequest = (calcPoint) => {
  return {
    type: 'DELETE_CP_REQUEST',
    calcPoint
  }
}
// Sync redux cache state 
export const deleteCalcPointSuccess = (message) => {
  return {
    type: 'DELETE_CP_SUCCESS',
    successMsg: message
  }
}
// Sync redux cache state 
export const deleteCalcPointFailed = (error) => {
  return {
    type: 'DELETE_CP_FAILED',
    error
  }
}
// Sync redux cache state 
export const showCalcPointDeleteModal = (calcPoint) => {
  return {
    type: 'SHOW_DELETE_CP_MODAL',
    calcPointToDelete: calcPoint
  }
}
// Sync redux cache state 
export const hideCalcPointDeleteModal = () => {
  return {
    type: 'HIDE_DELETE_CP_MODAL'
  }
}