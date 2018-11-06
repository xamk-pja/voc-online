// ./react-redux-client/src/reducers/index.js
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import {buildingReducer} from './buildingReducer';

export default combineReducers({
  appState:appReducer,
  buildingState:buildingReducer,
  routing
})
