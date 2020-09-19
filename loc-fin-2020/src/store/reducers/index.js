import { combineReducers } from 'redux'
import locationReducer from './locationsReducer'



export default combineReducers({
  locations: locationReducer
})