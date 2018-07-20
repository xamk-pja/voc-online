// ./react-redux-client/src/actions/vocActions.js

// Actions makes the API calls to the Node backend

const apiUrl = "/api/";

export const toggleAddBook = () => {
  return {
    type: 'TOGGLE_ADD_BUILDING'
  }
}

export const addNewBuilding = (building) => {console.log(building)
  return (dispatch) => {
    dispatch(addNewBuildingRequest(building));
    return fetch(apiUrl, {
      method:'post',
      body: building,
    }).then(response => {
      if(response.ok){
        response.json().then(data => {console.log(data.building);
          dispatch(addNewBuildingRequestSuccess(data.building, data.message))
        })
      }
      else{
        response.json().then(error => {
          dispatch(addNewBuildingRequestFailed(error))
        })
      }
    })
  }
}

export const addNewBuildingRequest = (building) => {
  return {
    type: 'ADD_NEW_BUILDING_REQUEST',
    building
  }
}

export const addNewBuildingRequestSuccess = (building,message) => {
  return {
    type: 'ADD_NEW_BUILDING_REQUEST_SUCCESS',
    building:building,
    message:message
  }
}

export const addNewBuildingRequestFailed = (error) => {
  return {
    type: 'ADD_NEW_BUILDING_REQUEST_FAILED',
    error
  }
}

//Async action
export const fetchBuildings = () => {
  // Returns a dispatcher function
  // that dispatches an action at later time
  return (dispatch) => {

    dispatch(fetchBuildingsRequest());
    // Returns a promise
    return fetch(apiUrl)
                .then(response => {
                  if(response.ok){
                    response.json().then(data => {
                      dispatch(fetchBuildingsSuccess(data.buildings,data.message));
                    })
                  }
                  else{
                    response.json().then(error => {
                      dispatch(fetchBuildingsFailed(error));
                    })
                  }
                })


  }
}

export const fetchBuildingsRequest = () => {
  return {
    type:'FETCH_BUILDINGS_REQUEST'
  }
}


//Sync action
export const fetchBuildingsSuccess = (buildings,message) => {
  return {
    type: 'FETCH_BUILDINGS_SUCCESS',
    buildings: buildings,
    message: message,
    receivedAt: Date.now
  }
}

export const fetchBuildingsFailed = (error) => {
  return {
    type:'FETCH_BUILDINGS_FAILED',
    error
  }
}

// Returns a promise for building
export const fetchBuildingById = (buildingId) => {
  return (dispatch) => {
    dispatch(fetchBuildingRequest());
      // Returns a promise
      return fetch(apiUrl + buildingId)
             .then(response => {console.log(response)
               if(response.ok){
                 response.json().then(data => {
                   dispatch(fetchBuildingSuccess(data.building[0], data.message));
                 })
               }
               else{
                 response.json().then(error => {
                   dispatch(fetchBuildingFailed(error));
                 })
               }
             })

  }
}

export const fetchBuildingRequest = () => {
  return {
    type:'FETCH_BUILDING_REQUEST'
  }
}


//Sync action
export const fetchBuildingSuccess = (building,message) => {
  return {
    type: 'FETCH_BUILDING_SUCCESS',
    building: building,
    message: message,
    receivedAt: Date.now
  }
}

export const fetchBuildingFailed = (error) => {
  return {
    type:'FETCH_BUILDING_FAILED',
    error
  }
}

export const showEditModal = (buildingToEdit) => {
  return {
    type:'SHOW_EDIT_MODAL',
    building:buildingToEdit
  }
}

export const hideEditModal = () => {
  return {
    type:'HIDE_EDIT_MODAL'
  }
}

export const editBuilding = (building) => {
    return (dispatch) => {
      dispatch(editBuildingRequest(building));
      return fetch(apiUrl, {
        method:'put',
        body:building
      }).then(response => {
        if(response.ok){
          response.json().then(data => {
            dispatch(editBuildingSuccess(data.building, data.message));
          })
        }
        else{
          response.json().then(error => {
            dispatch(editBuildingFailed(error));
          })
        }
      })
    }
}

export const editBuildingRequest = (building) => {
   return {
     type:'EDIT_BUILDING_REQUEST',
     building
   }
}

export const editBuildingSuccess = (building,message) => {
  return {
    type:'EDIT_BUILDING_SUCCESS',
    building:building,
    message:message
  }
}

export const editBuildingFailed = (error) => {
  return {
    type:'EDIT_BUILDING_FAILED',
    error
  }
}

export const deleteBuilding = (building) => {
  return (dispatch) => {
    dispatch(deleteBuildingRequest(building));
    return fetch(apiUrl + building._id ,{
      method:'delete'
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(deleteBuildingSuccess(data.message));
        })
      }
      else{
        response.json().then(error => {
          dispatch(deleteBuildingFailed(error));
        })
      }
    })

  }
}

export const deleteBuildingRequest = (building) => {
   return {
     type:'DELETE_BUILDING_REQUEST',
     building
   }
}
export const deleteBuildingSuccess = (message) => {
  return {
    type:'DELETE_BUILDING_SUCCESS',
    message:message
  }
}

export const deleteBuildingFailed = (error) => {
  return {
    type:'DELETE_BUILDING_FAILED',
    error
  }
}

export const showDeleteModal = (buildingToDelete) => {
  return {
    type:'SHOW_DELETE_MODAL',
    building:buildingToDelete
  }
}

export const hideDeleteModal = () => {
  return {
    type:'HIDE_DELETE_MODAL'
  }
}

/* Should add new calc point for parent building */
export const addNewCalcPoint = (calcPoint) => {
    
  return (dispatch) => {
    dispatch(addNewCalcPointRequest(calcPoint));

    fetch(apiUrl +"/cp/" + calcPoint.get("parent"), {
      method:'post',
      body: calcPoint,
    }).then(response => {
      if(response.ok){
        response.json().then(data => {console.log(data);
          dispatch(addNewCalcPointRequestSuccess(data.newCalcPoint, data.message))
        })
      }
      else{
        response.json().then(error => {
          dispatch(addNewCalcPointRequestFailed(error))
        })
      }
    })
  }
}

export const addNewCalcPointRequest = (calcPoint) => {
  return {
    type: 'ADD_NEW_CP_REQUEST',
    calcPoint
  }
}

export const addNewCalcPointRequestSuccess = (calcPoint,message) => {
  return {
    type: 'ADD_NEW_CP_REQUEST_SUCCESS',
    calcPoint:calcPoint,
    successMsg:message
  }
}

export const addNewCalcPointRequestFailed = (error) => {
  return {
    type: 'ADD_NEW_CP_REQUEST_FAILED',
    error
  }
}

export const editCalcPoint = (calcPointToEdit) => {
  return (dispatch) => {
    dispatch(editBuildingCalcPointRequest(calcPointToEdit));
    return fetch(apiUrl + "/cp/", {
      method:'put',
      body:calcPointToEdit
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(editBuildingCalcPointSuccess(data.newCalcPoint, data.message));
        })
      }
      else{
        response.json().then(error => {
          dispatch(editBuildingCalcPointFailed(error));
        })
      }
    })
  }
}

// Calculation position that's linked to a building

export const addCalcPointModal = () => {
  return {
    type:'ADD_CP_MODAL'


  }
}

export const hideCalcPointAddModal = () => {
  return {
    type:'HIDE_CP_ADD_MODAL'
  }
}


export const hideCalcPointEditModal = () => {
  return {
    type:'HIDE_CP_EDIT_MODAL'
  }
}

export const showCalcPointEditModal = (calcPointToEdit) => {
  return {
    type:'EDIT_CP_MODAL',
    calcPointToEdit:calcPointToEdit
  }
}


export const editBuildingCalcPointRequest = (calcPointToEdit) => {
  return {
    type:'EDIT_CP_REQUEST',
    calcPointToEdit
  }
}

export const editBuildingCalcPointSuccess = (calcPointToEdit,message) => {
 return {
   type:'EDIT_CP_SUCCESS',
   calcPointToEdit:calcPointToEdit,
   successMsg:message
 }
}

export const editBuildingCalcPointFailed = (error) => {
 return {
   type:'EDIT_CP_FAILED',
   error
 }
}


export const deleteCalcPoint = (calcPoint) => {
  return (dispatch) => {
    dispatch(deleteCalcPointRequest(calcPoint));
    return fetch(apiUrl + "/cp/" + calcPoint._id ,{
      method:'delete'
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(deleteCalcPointSuccess(data.message));
        })
      }
      else{
        response.json().then(error => {
          dispatch(deleteCalcPointFailed(error));
        })
      }
    })

  }
}

export const deleteCalcPointRequest = (calcPoint) => {
   return {
     type:'DELETE_CP_REQUEST',
     calcPoint
   }
}

export const deleteCalcPointSuccess = (message) => {
  return {
    type:'DELETE_CP_SUCCESS',
    successMsg:message
  }
}

export const deleteCalcPointFailed = (error) => {
  return {
    type:'DELETE_CP_FAILED',
    error
  }
}

export const showCalcPointDeleteModal = (calcPoint) => {
  return {
    type:'SHOW_DELETE_CP_MODAL',
    calcPointToDelete:calcPoint
  }
}

export const hideCalcPointDeleteModal = () => {
  return {
    type:'HIDE_DELETE_CP_MODAL'
  }
}