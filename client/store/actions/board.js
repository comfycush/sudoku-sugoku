import {
  SET_BOARD,
  SET_BOARD_LOADING,
  SET_BOARD_ERROR,
  SET_INPUT,
  SET_STATUS,
  SET_DIFFICULTY_LEVEL,
  SET_ORIGINAL_BOARD
} from '../actionTypes'
import { setAttempts } from './player'
import store from '..'

const attempts = store.getState().player.attempts

export function setBoard(input) {
  return {
    type: SET_BOARD,
    payload: input
  }
}

export function setOriginalBoard(input) {
  return {
    type: SET_ORIGINAL_BOARD,
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

export function setInput(input) {
  return {
    type: SET_INPUT,
    payload: input
  }
}

export function setStatus(input) {
  return {
    type: SET_STATUS,
    payload: input
  }
}

export function setDifficultyLevel(input) {
  return {
    type: SET_DIFFICULTY_LEVEL,
    payload: input
  }
}

export function fetchBoard(difficulty) {
  return dispatch => {
    dispatch(setLoading(true))
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setBoard(data.board))
        dispatch(setOriginalBoard(data.board))
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

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export function validateBoard(board) {
  return dispatch => {
    const data = {board}
    fetch(`https://sugoku.herokuapp.com/validate`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeParams(data)
    })
      .then(res => res.json())
      .then(data => {
        dispatch(setStatus(data.status))
        if (data.status !== 'solved') {
          dispatch(setAttempts(attempts + 1))
        }
        return data.status
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function solveBoard(board) {
  return dispatch => {
    const data = {board}
    fetch(`https://sugoku.herokuapp.com/solve`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeParams(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'unsolvable') {
          console.log('board is unsolvable');
        } else {
          dispatch(setBoard(data.solution))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}