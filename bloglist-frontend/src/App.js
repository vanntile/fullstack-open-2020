import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Notification } from './components/Notification'
import { Blog, initBlog } from './components/Blog'
import { Login } from './components/Login'
import { WritePost } from './components/WritePost'
import { Togglable } from './components/Togglable'
import { useLocalCredentials } from './reducers/login'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const writeFormRef = useRef()

  useEffect(() => {
    // eslint-disable-next-line
    dispatch(useLocalCredentials(JSON.parse(window.localStorage.getItem('user'))))
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlog())
  }, [dispatch])

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="Login">
          <Login />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged in</p>

          <Togglable buttonLabel="Create new post" ref={writeFormRef}>
            <WritePost writeFormRef={writeFormRef} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} {...{ blog }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
