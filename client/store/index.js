import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import boardReducers from './reducers/board'

const reducers = combineReducers({
  board: boardReducers
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store