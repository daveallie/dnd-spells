import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// should we add dev tools?
const applyDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.NODE_ENV !== "production" &&
  process.env.NODE_ENV !== "staging"

const composeEnhancers = applyDevTools
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export default (reducer, initialState, ...middleware) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, ...middleware))
  )
}
