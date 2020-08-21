import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { notificationReducer } from './components/Notification'
import { blogsReducer } from './components/Blog'
import { loginReducer } from './reducers/login'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: loginReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
