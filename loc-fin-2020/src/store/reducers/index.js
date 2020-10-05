import { combineReducers } from 'redux'
import locationsReducer from './locationsReducer'
import usersReducer from './usersReducer'

export default combineReducers({
  locations: locationsReducer,
  users: usersReducer
})
