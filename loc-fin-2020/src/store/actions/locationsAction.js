import { GET_LOCATIONS, LOCATIONS_ERROR, ADD_LOCATION, ADD_LOCATION_ERROR } from '../actionTypes'
import { get, post } from 'axios'


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
      locations: res.data
    });
  } catch (err) {
    dispatch({
      type: ADD_LOCATION_ERROR,
      err
    });
  }
};
