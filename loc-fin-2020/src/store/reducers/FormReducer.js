import { SET_EDIT_FORM } from '../actionTypes';

const initialState = {
  location: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_FORM: {
      const { location } = action;
      return {
        ...state,
        location: location,
      }
    }
    default:
      return state;
  }
}