import { GET_USERS, GET_USERS_ERROR, ADD_USER, ADD_USER_ERROR, RESET_USER, RESET_USER_ERROR, GET_USER, GET_USER_ERROR, EDIT_USER, EDIT_USER_ERROR } from '../actionTypes'
import { get, post, put } from 'axios'

export const getUsers = () => async dispatch => {
  try {
    const res = await get('/users');

    dispatch({
      type: GET_USERS,
      users: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_ERROR,
      err
    });
  }
};
export const addUser = (newUser) => async dispatch => {
  try {
    const res = await post('/users', newUser);

    dispatch({
      type: ADD_USER,
      user: res.data
    });
  } catch (err) {
    dispatch({
      type: ADD_USER_ERROR,
      err
    });
  }
};
export const getUserById = (id) => async dispatch => {
  try {
    const res = await get('/users/' + id)
    dispatch({
      type: GET_USER,
      user: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USER_ERROR,
      err
    });
  }
};
export const editUser = (newUser, id) => async dispatch => {
  try {
    const res = await put('/users/' + id, newUser);
    console.log(res.data, 'RES');
    dispatch({
      type: EDIT_USER,
      user: res.data
    });
  } catch (err) {
    dispatch({
      type: EDIT_USER_ERROR,
      err
    });
  }
};
export const resetUser = () => async dispatch => {
  try {
    dispatch({
      type: RESET_USER,
      user: ''
    });
  } catch (err) {
    dispatch({
      type: RESET_USER_ERROR,
      err
    });
  }
}
