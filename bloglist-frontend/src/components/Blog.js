import React from 'react'

import { Togglable } from './Togglable'

import blogService from '../services/blogs'

export const Blog = ({ blog, updateBlog, deleteBlog, handleNotification }) => (
  <div>
    {blog.title} {blog.author}
    <Togglable buttonLabel="view">
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}{' '}
        <button
          onClick={async () => {
            try {
              console.log(1)
              const saved = await blogService.like({ id: blog.id, likes: blog.likes ? blog.likes + 1 : 1 })
              console.log(2)
              updateBlog(saved)
              console.log(3)
            } catch (e) {
              handleNotification({ message: e.error })
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
              await blogService.deletePost({ id: blog.id })
              deleteBlog()
            } catch (e) {
              handleNotification({ message: e.error })
            }
          }}
        >
          delete
        </button>
      </div>
    </Togglable>
  </div>
)
