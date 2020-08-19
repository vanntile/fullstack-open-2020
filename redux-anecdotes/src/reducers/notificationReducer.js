export const ACTION = {
  SHOW_NOTIFICATION: 'show_not',
  HIDE_NOTIFICATION: 'hide_not',
}

export const setNotification = (data, seconds) => async (dispatch) => {
  dispatch({ type: ACTION.SHOW_NOTIFICATION, data })

  setTimeout(() => {
    dispatch({ type: ACTION.HIDE_NOTIFICATION })
  }, seconds * 1000)
}

const notificationReducer = (state = 'No notification', action) => {
  switch (action.type) {
    case ACTION.SHOW_NOTIFICATION:
      return action.data
    case ACTION.HIDE_NOTIFICATION:
      return null
    default:
      return state
  }
}

export default notificationReducer
