import React from 'react'
import { useDispatch } from 'react-redux'

import { Togglable } from '../Togglable'
import { setNotification } from '../Notification'
import { updateBlog, deleteBlog } from '../Blog'

export const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  return (
    <div>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}{' '}
          <button
            onClick={async () => {
              try {
                dispatch(updateBlog({ id: blog.id, likes: blog.likes ? blog.likes + 1 : 1 }))
              } catch (e) {
                dispatch(setNotification({ message: e.error }))
              }
            }}
          >
            like
          </button>{' '}
        </div>
        <div>
          <button
            onClick={async () => {
              try {
                dispatch(deleteBlog({ id: blog.id }))
              } catch (e) {
                dispatch(setNotification({ message: e.error }))
              }
            }}
          >
            delete
          </button>
        </div>
      </Togglable>
    </div>
  )
}
