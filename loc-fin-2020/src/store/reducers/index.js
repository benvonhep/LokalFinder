import { combineReducers } from 'redux'
import FormReducer from './FormReducer'
import locationsReducer from './locationsReducer'
import modalReducer from './modalReducer'



export default combineReducers({
  locations: locationsReducer,
  modal: modalReducer,
  // location: FormReducer
})
