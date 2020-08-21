import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from './Notification'
import { login } from '../reducers/login'

export const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(login({ username, password }))

      setUsername('')
      setPassword('')

      localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.error(e)
      dispatch(setNotification({ message: 'Wrong username or password' }))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login into this application</h2>
      <label htmlFor="current-username" style={{ display: 'block' }}>
        username
      </label>
      <input
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        type="text"
        name="current-username"
      />
      <label htmlFor="current-password" style={{ display: 'block' }}>
        password
      </label>
      <input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        type="password"
        name="current-password"
      />
      <button type="submit" style={{ display: 'block' }}>
        Login
      </button>
    </form>
  )
}
