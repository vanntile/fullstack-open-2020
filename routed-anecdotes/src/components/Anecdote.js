import React from 'react'

export const Anecdote = ({ content, author, info, votes }) => {
  return (
    <div>
      <h2>
        {content} by {author}
      </h2>
      <p>Has {votes} votes</p>
      <p>
        For more info see:{' '}
        <a href={info} target="_blank">
          {info}
        </a>{' '}
      </p>
    </div>
  )
}
