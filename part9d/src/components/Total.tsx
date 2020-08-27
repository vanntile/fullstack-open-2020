import React from 'react'

interface TotalProps {
  courseParts: {
    name: String
    exerciseCount: number
  }[]
}

export const Total: React.FC<TotalProps> = ({ courseParts }) => {
  return <p>Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
}
