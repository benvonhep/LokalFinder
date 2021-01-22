import { combineReducers } from 'redux';
import locationsReducer from './locationsReducer';
import usersReducer from './usersReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  locations: locationsReducer,
  users: usersReducer,
  alerts: alertReducer,
});
