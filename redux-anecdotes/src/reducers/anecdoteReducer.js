import anecdotesService from '../services/anecdotes'

export const ACTION = {
  INIT: 'init',
  VOTE: 'vote',
  CREATE: 'create',
}

export const initAnecdotes = () => async (dispatch) => {
  const data = await anecdotesService.getAll()
  dispatch({ type: ACTION.INIT, data })
}

export const voteAnecdote = ({ id, content, votes }) => async (dispatch) => {
  const data = await anecdotesService.update({ id: id, content, votes: votes + 1 })
  dispatch({ type: ACTION.VOTE, data })
}

export const createAnecdote = (content) => async (dispatch) => {
  const data = await anecdotesService.createNew(content)
  dispatch({ type: ACTION.CREATE, data })
}

const anecdotesReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION.VOTE:
      return state
        .map((s) => (s.id === action.data.id ? { ...action.data } : { ...s }))
        .sort((a, b) => a.votes < b.votes)
    case ACTION.CREATE:
      return [...state, action.data]
    case ACTION.INIT:
      return action.data
    default:
      return state.map((s) => ({ ...s }))
  }
}

export default anecdotesReducer
