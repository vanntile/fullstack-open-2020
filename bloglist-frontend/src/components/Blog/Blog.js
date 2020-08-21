import React from 'react'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

import { Togglable } from '../Togglable'
import { setNotification } from '../Notification'
import { updateBlog, deleteBlog } from '../Blog'

export const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  return (
    <ListGroup.Item>
      <span className="font-weight-bold">{blog.title}</span> by <span className="font-italic">{blog.author}</span>{' '}
      <Togglable buttonLabel="view">
        <div>{blog.url}</div>
        likes: {blog.likes || 0}{' '}
        <Button
          variant="success"
          size="sm"
          className="mx-2"
          onClick={async () => {
            try {
              dispatch(updateBlog({ id: blog.id, likes: blog.likes ? blog.likes + 1 : 1 }))
            } catch (e) {
              dispatch(setNotification({ message: e.error }))
            }
          }}
        >
          like
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="mx-2"
          onClick={async () => {
            try {
              dispatch(deleteBlog({ id: blog.id }))
            } catch (e) {
              dispatch(setNotification({ message: e.error }))
            }
          }}
        >
          delete
        </Button>
      </Togglable>
    </ListGroup.Item>
  )
}
