import { GET_USERS, ADD_USER, GET_USER, EDIT_USER } from '../actionTypes'

const initialState = {
  users: [],
  user: '',
  loading: true
}

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false
      }

    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user],
        loading: false
      }

    case GET_USER:
      return {
        ...state,
        user: action.user,
        loading: false
      }

    case EDIT_USER:
      const edituserIndex = state.users.findIndex(user => user.id === action.user.id)
      const users = [
        ...state.users.slice(0, edituserIndex),
        action.user,
        ...state.users.slice(edituserIndex + 1)
      ];

      return {
        ...state,
        users
      }
    default: return state
  }

}