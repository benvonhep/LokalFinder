import { SET_EDIT_FORM } from '../actionTypes';

export const setEditForm = (location) => dispatch => {
  dispatch({
    type: SET_EDIT_FORM,
    formData: location,
  })
}