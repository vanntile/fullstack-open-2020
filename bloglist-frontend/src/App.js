import React, { useState, useEffect } from 'react'

import { Notification } from './components/Notification'
import { Blog } from './components/Blog'
import { Login } from './components/Login'
import { WritePost } from './components/WritePost'
import './App.css'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState({ message: null, styleClass: null })

  const handleNotification = (notification, duration = 2500) => {
    setErrorMessage(notification)
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

      localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.error(e)
      handleNotification({ message: 'Wrong username or password', styleClass: 'notificationbad' })
    }
  }

  const handleCreate = async (event, { author, title }) => {
    event.preventDefault()

    try {
      const newPost = await blogService.postNew({ author, title })
      setBlogs(blogs.concat(newPost))

      handleNotification({ message: `New blog post: ${title} by ${author}`, styleClass: 'notificationgood' })
    } catch (e) {
      console.error(e)
      handleNotification({ message: e.error, styleClass: 'notificationbad' })
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
        <Login {...{ username, setUsername, password, setPassword, handleLogin }} />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <WritePost handleCreate={handleCreate} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
