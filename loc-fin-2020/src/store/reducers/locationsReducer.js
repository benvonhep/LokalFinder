import { GET_LOCATIONS } from '../actionTypes'

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
    default: return state
  }

}