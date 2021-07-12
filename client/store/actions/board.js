import {
  SET_BOARD,
  SET_BOARD_LOADING,
  SET_BOARD_ERROR
} from '../actionTypes'

export function setBoard(input) {
  return {
    type: SET_BOARD,
    payload: input
  }
}

export function setLoading(input) {
  return {
    type: SET_BOARD_LOADING,
    payload: input
  }
}

export function setError(input) {
  return {
    type: SET_BOARD_ERROR,
    payload: input
  }
}

export function fetchBoard() {
  return dispatch => {
    dispatch(setLoading(true))
    fetch(`https://sugoku.herokuapp.com/board?difficulty=easy`)
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.board.length; i++) {
          for (let j = 0; j < data.board[i].length; j++) {
            if (data.board[i][j] === 0) {
              data.board[i][j] = ''
            }
          }
        }
        dispatch(setBoard(data))
      })
      .catch(err => {
        console.log(err)
        dispatch(setError(err))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}