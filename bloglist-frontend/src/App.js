import React, { useState, useEffect, useRef } from 'react'

import { Notification } from './components/Notification'
import { Blog } from './components/Blog'
import { Login } from './components/Login'
import { WritePost } from './components/WritePost'
import { Togglable } from './components/Togglable'
import './App.css'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState({ message: null, styleClass: null })

  const loginFormRef = useRef()
  const writeFormRef = useRef()

  const handleNotification = ({ message, styleClass = 'notificationbad' }, duration = 2500) => {
    setErrorMessage({ message, styleClass })
    setTimeout(() => {
      setErrorMessage({ message: null, styleClass: null })
    }, duration)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      setUsername('')
      setPassword('')
      loginFormRef.current.toggleVisibility()

      localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.error(e)
      handleNotification({ message: 'Wrong username or password' })
    }
  }

  const handleCreate = async (event, { author, title }) => {
    event.preventDefault()

    try {
      const newPost = await blogService.postNew({ author, title })
      setBlogs(blogs.concat(newPost))
      writeFormRef.current.toggleVisibility()

      handleNotification({ message: `New blog post: ${title} by ${author}`, styleClass: 'notificationgood' })
    } catch (e) {
      console.error(e)
      handleNotification({ message: e.error })
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h1>blogs</h1>
      <Notification {...errorMessage} />
      {user === null ? (
        <Togglable buttonLabel="Login" ref={loginFormRef}>
          <Login {...{ username, setUsername, password, setPassword, handleLogin }} />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged in</p>

          <Togglable buttonLabel="Create new post" ref={writeFormRef}>
            <WritePost {...{ handleCreate }} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              {...{
                blog,
                updateBlog: (b) => {
                  setBlogs(blogs.map((p) => (p.id === b.id ? b : p)))
                },
                deleteBlog: () => {
                  setBlogs(blogs.filter((p) => p.id !== blog.id))
                },
                handleNotification,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
