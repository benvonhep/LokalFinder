import { GET_LOCATIONS, LOCATIONS_ERROR } from '../types'
import { get } from 'axios'


export function getLocations() {
  return function (dispatch) {
    return get('/locations')
      .then(function (response) {
        dispatch({ type: GET_LOCATIONS, locations: response.data })
      })
      .catch(function (error) {
        dispatch({ type: LOCATIONS_ERROR, error: error })
        console.log('error', error);
      })
  }
}


// export const getLocations = () => async dispatch => {
//
//   try {
//     const res = await axios.get(`http://localhost:5000/locations`)
//     dispatch({
//       type: GET_LOCATIONS,
//       payload: res.data
//     })
//   }
//   catch (e) {
//     dispatch({
//       type: LOCATIONS_ERROR,
//       payload: console.log(e),
//     })
//   }
//
// }