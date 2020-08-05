const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const ACTION = {
  VOTE: 'vote',
  CREATE: 'create',
}

export const voteAnecdote = (id) => ({ type: ACTION.VOTE, data: { id } })

export const createAnecdote = (content) => ({ type: ACTION.CREATE, data: { content } })

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.VOTE:
      return state
        .map((s) => (s.id === action.data.id ? { ...s, votes: s.votes + 1 } : { ...s }))
        .sort((a, b) => a.votes < b.votes)
    case ACTION.CREATE:
      return [...state, asObject(action.data.content)]
    default:
      return state.map((s) => ({ ...s }))
  }

  return state
}

export default reducer
