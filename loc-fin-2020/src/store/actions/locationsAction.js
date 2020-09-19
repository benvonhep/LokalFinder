import { GET_LOCATIONS, LOCATIONS_ERROR } from '../types'
import axios from 'axios'

export const getLocations = () => async dispatch => {

  try {
    const res = await axios.get(`http://localhost:5000/locations`)
    dispatch({
      type: GET_LOCATIONS,
      payload: res.data
    })
  }
  catch (e) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: console.log(e),
    })
  }

}