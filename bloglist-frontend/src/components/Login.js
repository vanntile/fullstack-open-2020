import React from 'react'

export const Login = ({ username, setUsername, password, setPassword, handleLogin }) => {
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
