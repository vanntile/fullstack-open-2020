import blogService from '../../services/blogs'

const ACTION = {
  INIT: 'init',
  VOTE: 'vote',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
}

export const initBlog = () => async (dispatch) => {
  const data = await blogService.getAll()
  dispatch({ type: ACTION.INIT, data })
}

export const createNew = ({ author, title }) => async (dispatch) => {
  const data = await blogService.postNew({ author, title })
  dispatch({ type: ACTION.CREATE, data })
}

export const updateBlog = ({ id, likes }) => async (dispatch) => {
  const data = await blogService.like({ id, likes })
  dispatch({ type: ACTION.UPDATE, data })
}

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.deletePost({ id })
  dispatch({ type: ACTION.DELETE, data: { id } })
}

export const reducer = (state = [], action) => {
  switch (action.type) {
    case ACTION.INIT:
      return action.data
    case ACTION.CREATE:
      return state.concat(action.data)
    case ACTION.UPDATE:
      return state.map((p) => (p.id === action.data.id ? action.data : p))
    case ACTION.DELETE:
      return state.filter((p) => p.id !== action.data.id)
    default:
      return state
  }
}
