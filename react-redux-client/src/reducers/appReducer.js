// ./react-redux-client/src/reducers/appReducer.js
const INITIAL_STATE = {
  showAddBuilding: false
}

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_BUILDING':
          return {
            ...currentState,showAddBuilding: !currentState.showAddBuilding
          }


    default:
       return currentState;

  }
}

export default appReducer;
