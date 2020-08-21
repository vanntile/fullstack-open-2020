const ACTION = {
  SHOW_NOTIFICATION: 'show_not',
  HIDE_NOTIFICATION: 'hide_not',
}

export const setNotification = (data, seconds = 3) => async (dispatch) => {
  dispatch({ type: ACTION.SHOW_NOTIFICATION, data })

  setTimeout(() => {
    dispatch({ type: ACTION.HIDE_NOTIFICATION })
  }, seconds * 1000)
}

export const reducer = (state = null, action) => {
  switch (action.type) {
    case ACTION.SHOW_NOTIFICATION:
      return action.data
    case ACTION.HIDE_NOTIFICATION:
      return null
    default:
      return state
  }
}

export default { reducer, setNotification }
