import { GET_LOCATIONS, ADD_LOCATION } from '../actionTypes'

const initialState = {
  locations: [],
  loading: true
}

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        locations: action.locations,
        loading: false
      }
    case ADD_LOCATION:
      return {
        locations: action.location
      }
    default: return state
  }

}