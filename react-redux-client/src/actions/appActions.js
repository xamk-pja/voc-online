// ./react-redux-client/src/actions/appActions.js

export const toggleAddBuilding = () => {
  return {
    type: 'TOGGLE_ADD_BUILDING'
  }
}

export const loginSuccess = (kc) => {
  return {
    type: 'LOGIN_DETAILS',
    kc: kc
  }
}

