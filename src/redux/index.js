import { compose, applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducer from './modules'

const middlewares = [ReduxThunk]

export default initialState => compose(
  applyMiddleware(...middlewares),
  process.env.NODE_ENV !== 'production' && window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(reducer, initialState)
