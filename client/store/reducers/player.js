import {
  SET_PLAYER,
  ADD_PLAYER_LIST,
  SET_PLAYER_TIME
} from '../actionTypes'

const initialState = {
  name: '',
  time: 0,
  playerList: []
}

function playerReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_PLAYER:
      return { ...state, name: payload }
    case ADD_PLAYER_LIST:
      return { ...state, playerList: [...state.playerList, payload]}
    default:
      return state
  }
}

export default playerReducer