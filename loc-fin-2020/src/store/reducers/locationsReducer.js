import { GET_LOCATIONS, ADD_LOCATION, EDIT_LOCATION, GET_LOCATION } from '../actionTypes'

const initialState = {
  locations: [],
  location: '',
  loading: true
}

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.locations,
        loading: false
      }
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.location],
        loading: false
      }
    case GET_LOCATION:
      return {
        ...state,
        location: action.location,
        loading: false
      }
    case EDIT_LOCATION:
      return {
        ...state,
        location: [...action.location],
        loading: false
      }
    default: return state
  }

}