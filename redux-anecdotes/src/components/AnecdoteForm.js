import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (e) => {
    e.preventDefault()
    const s = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(s))

    if (!s) return
    dispatch(setNotification(`You created: "${s}"`, 4))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
