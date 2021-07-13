import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import boardReducers from './reducers/board'
import playerReducer from './reducers/player'

const reducers = combineReducers({
  board: boardReducers,
  player: playerReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
)

export default store