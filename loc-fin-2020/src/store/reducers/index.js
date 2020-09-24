import { combineReducers } from 'redux'
import locationsReducer from './locationsReducer'

export default combineReducers({
  locations: locationsReducer
})
