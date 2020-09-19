import { SHOW_MODAL, HIDE_MODAL } from '../actionTypes'

const initialState = {
  modal: false
}

export default function modalReducer(state = initialState, action) {

  switch (action.type) {
    // case SHOW_MODAL:
    //   return {
    //     modal: true
    //   }
    case HIDE_MODAL:
      return initialState;
    default: return state
  }

}