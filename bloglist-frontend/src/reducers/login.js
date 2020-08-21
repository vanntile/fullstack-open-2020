import loginService from '../services/login'
import blogService from '../services/blogs'

const ACTION = {
  SET: 'set',
  CLEAR: 'clear',
}

export const login = ({ username, password }) => async (dispatch) => {
  const data = await loginService.login({ username, password })
  blogService.setToken(data.token)
  localStorage.setItem('user', JSON.stringify(data))
  dispatch({ type: ACTION.SET, data })
}

export const useLocalCredentials = (data) => async (dispatch) => {
  if (!data) return
  blogService.setToken(data.token)
  dispatch({ type: ACTION.SET, data })
}

export const loginReducer = (state = null, action) => {
  switch (action.type) {
    case ACTION.SET:
      return action.data
    case ACTION.CLEAR:
      return null
    default:
      return state
  }
}
