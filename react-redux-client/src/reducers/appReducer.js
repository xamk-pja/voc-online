// ./react-redux-client/src/reducers/appReducer.js
const INITIAL_STATE = {
  showAddBuilding: false,
  kc: null
}

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_BUILDING':
      return {
        ...currentState, showAddBuilding: !currentState.showAddBuilding
      }

    case 'LOGIN_DETAILS':
      return {
        ...currentState,
        kc: action.kc // keycloak instance to redux cache
      }

    default:
      return currentState;

  }
}

export default appReducer;
