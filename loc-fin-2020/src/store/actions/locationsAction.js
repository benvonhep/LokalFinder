import { GET_LOCATIONS, LOCATIONS_ERROR, ADD_LOCATION, ADD_LOCATION_ERROR, GET_LOCATION, GET_LOCATION_ERROR, EDIT_LOCATION, EDIT_LOCATION_ERROR } from '../actionTypes'
import { get, post, put } from 'axios'



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
export const getLocationFromSelect = (location) => async dispatch => {
  try {
    const id = location.id
    const res = await get('/locations/' + id)
    console.log(res.data, 'DATA');
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
