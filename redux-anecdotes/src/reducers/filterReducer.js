const ACTION = {
  UPDATE: 'updateFilter',
}

export const updateFilterAction = (data) => ({ type: ACTION.UPDATE, data })
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case ACTION.UPDATE:
      return action.data
    default:
      return state
  }
}

export default filterReducer
