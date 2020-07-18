import React, { useState } from 'react'

export const WritePost = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

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
