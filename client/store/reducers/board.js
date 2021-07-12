import {
  SET_BOARD,
  SET_BOARD_LOADING,
  SET_BOARD_ERROR
} from '../actionTypes'

const initialState = {
  board: {},
  isLoading: false,
  isError: false
}

function boardReducers(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_BOARD:
      return { ...state, board: payload }
    case SET_BOARD_LOADING:
      return { ...state, isLoading: payload }
    case SET_BOARD_ERROR:
      return { ...state, isError: payload }
    default:
      return state
  }
}

export default boardReducers