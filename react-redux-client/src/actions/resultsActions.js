// ./react-redux-client/src/actions/vocActions.js

// Actions makes the API calls to the Node backend

const apiUrl = "/api/results/";


// Add result for calcPoint
export const addResult = (dataToAdd) => {
  console.log(dataToAdd)
  return (dispatch) => {
    dispatch(addResultForCalcPointRequest(dataToAdd));
    return fetch(apiUrl, {
      method: 'post',
      body: dataToAdd,
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(addResultForCalcPointRequestSuccess(data.addedResult, data.message))
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

export const addResultForCalcPointRequest = (addedResult) => {
  return {
    type: 'ADD_NEW_RESULT_REQUEST',
    addedResult: addedResult
  }
}

export const addResultForCalcPointRequestSuccess = (addedResult, message) => {
  return {
    type: 'ADD_NEW_RESULT_REQUEST_SUCCESS',
    addedResult: addedResult,
    successMsg: message
  }
}

export const addNewBuildingRequestFailed = (error) => {
  return {
    type: 'ADD_NEW_RESULT_REQUEST_FAILED',
    error
  }
}


// Returns a promise for building
export const fetchResultsForCalcPoint = (calcPointId) => {
  return (dispatch) => {
    dispatch(fetchResultsRequest());
    // Returns a promise
    return fetch(apiUrl + calcPointId)
      .then(response => {
        console.log(response)
        if (response.ok) {
          response.json().then(data => {
            dispatch(fetchResultsSuccess(data.results, data.calcPoint, data.message));
          })
        }
        else {
          response.json().then(error => {
            dispatch(fetchResultsFailed(error));
          })
        }
      })

  }
}

export const fetchResultsRequest = () => {
  return {
    type: 'FETCH_RESULTS_REQUEST'
  }
}


//Sync action
export const fetchResultsSuccess = (results, calcPoint, message) => {
  return {
    type: 'FETCH_RESULTS_SUCCESS',
    results: results,
    calcPoint: calcPoint,
    message: message,
    receivedAt: Date.now
  }
}

export const fetchResultsFailed = (error) => {
  return {
    type: 'FETCH_RESULTS_FAILED',
    error
  }
}

// show / hide
export const showAddResultModal = (calcPoint) => {
  if (calcPoint !== null) {
    return {
      type: 'SHOW_ADD_RESULT_MODAL',
      calcPoint: calcPoint
    }
  }
}

export const hideAddResultModal = () => {
  return {
    type: 'HIDE_ADD_RESULT_MODAL'
  }
}

// show / hide
export const showEditResultModal = (result) => {
  if (result !== null) {
    return {
      type: 'SHOW_EDIT_RESULT_MODAL',
      resultToEdit: result
    }
  }
}

export const hideEditResultModal = () => {
  return {
    type: 'HIDE_EDIT_RESULT_MODAL'
  }
}

export const editResult = (result) => {
  return (dispatch) => {
    dispatch(editResultRequest(result));
    return fetch(apiUrl, {
      method: 'put',
      body: result
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(editResultSuccess(data.result, data.message));
        })
      }
      else {
        response.json().then(error => {
          dispatch(editResultFailed(error));
        })
      }
    })
  }
}

export const editResultRequest = (result) => {
  return {
    type: 'EDIT_RESULT_REQUEST',
    result
  }
}

export const editResultSuccess = (result, message) => {
  return {
    type: 'EDIT_RESULT_SUCCESS',
    result: result,
    message: message
  }
}

export const editResultFailed = (error) => {
  return {
    type: 'EDIT_RESULT_FAILED',
    error
  }
}

export const deleteResult = (resultToDelete) => {
  return (dispatch) => {
    dispatch(deleteResultRequest(resultToDelete));
    return fetch(apiUrl + resultToDelete._id, {
      method: 'delete'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(deleteResultSuccess(data.message));
        })
      }
      else {
        response.json().then(error => {
          dispatch(deleteResultFailed(error));
        })
      }
    })

  }
}

export const deleteResultRequest = (resultToDelete) => {
  return {
    type: 'DELETE_RESULT_REQUEST',
    resultToDelete
  }
}
export const deleteResultSuccess = (message) => {
  return {
    type: 'DELETE_RESULT_SUCCESS',
    message: message
  }
}

export const deleteResultFailed = (error) => {
  return {
    type: 'DELETE_RESULT_FAILED',
    error
  }
}

export const showDeleteResultModal = (resultToDelete) => {
  return {
    type: 'SHOW_DELETE_RESULT_MODAL',
    resultToDelete: resultToDelete
  }
}

export const hideDeleteResultModal = () => {
  return {
    type: 'HIDE_DELETE_RESULT_MODAL'
  }
}


