import {
  SET_PLAYER,
  ADD_PLAYER_LIST,
  SET_PLAYER_TIME
} from '../actionTypes'

export function setPlayer(input) {
  return {
    type: SET_PLAYER,
    payload: input
  }
}

export function addPlayerList(input) {
  return {
    type: ADD_PLAYER_LIST,
    payload: input
  }
}