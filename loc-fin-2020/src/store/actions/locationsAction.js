import { GET_LOCATIONS, LOCATIONS_ERROR } from '../types'
import { get } from 'axios'


export function getLocations() {
  return function (dispatch) {
    return get('/locations')
      .then(function (response) {
        dispatch({ type: GET_LOCATIONS, locations: response.data })
      })
      .catch(function (error) {
        dispatch({ type: LOCATIONS_ERROR, error })
        console.log('error', error);
      })
  }
}