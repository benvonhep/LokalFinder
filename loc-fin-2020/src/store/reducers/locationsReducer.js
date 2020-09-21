import { GET_LOCATIONS, ADD_LOCATION, EDIT_LOCATION, GET_LOCATION, DELETE_LOCATION, RESET_LOCATION } from '../actionTypes'

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
      const stateCopy = [...state];
      const updatedList = stateCopy[action.location.id] = action.location;
      return updatedList;

    case DELETE_LOCATION:
      console.log(action.id, 'ID');
      const newList = state.locations.filter((location) =>
        location.id !== action.id);
      return {
        ...state,
        locations: newList
      }

    case RESET_LOCATION:
      return {
        ...state,
        location: action.location
      }
    default: return state
  }

}