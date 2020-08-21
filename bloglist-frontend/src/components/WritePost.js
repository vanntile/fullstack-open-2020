import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from './Notification'
import { createNew } from './Blog'

export const WritePost = ({ writeFormRef }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const handleCreate = async (event, { author, title }) => {
    event.preventDefault()

    try {
      dispatch(createNew({ author, title }))
      writeFormRef.current.toggleVisibility()

      dispatch(setNotification({ message: `New blog post: ${title} by ${author}`, styleClass: 'notificationgood' }))
    } catch (e) {
      console.error(e)
      dispatch(setNotification({ message: e.error }))
    }
  }

  return (
    <form
      onSubmit={(e) => {
        handleCreate(e, { title, author })
        setTitle('')
        setAuthor('')
      }}
    >
      <h2>Create a new blogpost</h2>
      <label htmlFor="title" style={{ display: 'block' }}>
        title
      </label>
      <input value={title} onChange={({ target }) => setTitle(target.value)} type="text" name="title" />
      <label htmlFor="author" style={{ display: 'block' }}>
        author
      </label>
      <input value={author} onChange={({ target }) => setAuthor(target.value)} type="text" name="author" />
      <button type="submit" style={{ display: 'block' }}>
        Create
      </button>
    </form>
  )
}
