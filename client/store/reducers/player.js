import {
  SET_PLAYER,
  ADD_PLAYER_LIST,
  SET_ATTEMPTS
} from '../actionTypes'

const initialState = {
  name: '',
  time: 0,
  attempts: 0,
  playerList: []
}

function playerReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_PLAYER:
      return { ...state, name: payload }
    case ADD_PLAYER_LIST:
      return { ...state, playerList: [...state.playerList, payload]}
    case SET_ATTEMPTS:
      return { ...state, attempts: state.attempts + payload }
    default:
      return state
  }
}

export default playerReducer