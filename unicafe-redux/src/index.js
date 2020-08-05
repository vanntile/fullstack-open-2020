import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const TYPES = {
  GOOD: 'GOOD',
  OK: 'OK',
  BAD: 'BAD',
  ZERO: 'ZERO',
}

const App = () => {
  const dispatch = (type = TYPES.ZERO) => {
    store.dispatch({
      type,
    })
  }

  return (
    <div>
      <button onClick={() => dispatch(TYPES.GOOD)}>good</button>
      <button onClick={() => dispatch(TYPES.OK)}>neutral</button>
      <button onClick={() => dispatch(TYPES.BAD)}>bad</button>
      <button onClick={() => dispatch(TYPES.ZERO)}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
