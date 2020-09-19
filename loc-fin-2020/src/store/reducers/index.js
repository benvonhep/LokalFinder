import { combineReducers } from 'redux'
import locationsReducer from './locationsReducer'
import modalReducer from './modalReducer'



export default combineReducers({
  locations: locationsReducer,
  modal: modalReducer
})
