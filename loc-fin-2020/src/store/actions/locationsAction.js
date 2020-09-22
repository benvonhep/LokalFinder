import { GET_LOCATIONS, LOCATIONS_ERROR, ADD_LOCATION, ADD_LOCATION_ERROR, GET_LOCATION, GET_LOCATION_ERROR, EDIT_LOCATION, EDIT_LOCATION_ERROR, DELETE_LOCATION, DELETE_LOCATION_ERROR, RESET_LOCATION, RESET_LOCATION_ERROR } from '../actionTypes'
import { get, post, put } from 'axios'
import axios from 'axios'



export const getLocations = () => async dispatch => {
  try {
    const res = await get('/locations');

    dispatch({
      type: GET_LOCATIONS,
      locations: res.data
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      err
    });
  }
};
export const addLocation = (newLocation) => async dispatch => {
  try {
    const res = await post('/locations', newLocation);

    dispatch({
      type: ADD_LOCATION,
      location: res.data
    });
  } catch (err) {
    dispatch({
      type: ADD_LOCATION_ERROR,
      err
    });
  }
};
export const getLocationFromSelect = (id) => async dispatch => {
  try {
    const res = await get('/locations/' + id)
    dispatch({
      type: GET_LOCATION,
      location: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_LOCATION_ERROR,
      err
    });
  }
};
export const editLocation = (newLocation, id) => async dispatch => {
  try {
    const res = await put('/locations/' + id, newLocation);
    console.log(res.data, 'RES');
    dispatch({
      type: EDIT_LOCATION,
      location: res.data
    });
  } catch (err) {
    dispatch({
      type: EDIT_LOCATION_ERROR,
      err
    });
  }
};
export const deleteLocation = (id) => async dispatch => {
  try {
    const res = axios.delete('/locations/' + id);
    console.log(res, 'RES');
    dispatch({
      type: DELETE_LOCATION,
      id: id
    });
  } catch (err) {
    dispatch({
      type: DELETE_LOCATION_ERROR,
      err
    });
  }
};

export const resetLocation = () => async dispatch => {
  try {
    dispatch({
      type: RESET_LOCATION,
      location: ''
    });
  } catch (err) {
    dispatch({
      type: RESET_LOCATION_ERROR,
      err
    });
  }
}