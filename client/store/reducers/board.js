import {
  SET_BOARD,
  SET_BOARD_LOADING,
  SET_BOARD_ERROR,
  SET_INPUT,
  SET_STATUS,
  SET_DIFFICULTY_LEVEL,
  SET_ORIGINAL_BOARD
} from '../actionTypes'

const initialState = {
  board: null,
  originalBoard: {},
  isLoading: false,
  isError: false,
  status: '',
  difficulty: ''
}

function boardReducers(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_BOARD:
      return { ...state, board: payload }
    case SET_BOARD_LOADING:
      return { ...state, isLoading: payload }
    case SET_ORIGINAL_BOARD:
      return { ...state, originalBoard: payload }
    case SET_BOARD_ERROR:
      return { ...state, isError: payload }
    case SET_INPUT:
      let newBoard = JSON.parse(JSON.stringify(state.board))
      newBoard[payload.row][payload.col] = payload.num
      return{ ...state, board: newBoard }
    case SET_STATUS:
      return { ...state, status: payload }
    case SET_DIFFICULTY_LEVEL:
      return { ...state, difficulty: payload}
    default:
      return state
  }
}

export default boardReducers