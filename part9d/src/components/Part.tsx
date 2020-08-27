import React from 'react'
import { CoursePart } from '../types'

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

interface PartProps {
  part: CoursePart
}

export const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <h2>
            {part.name}: {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
        </div>
      )
    case 'Using props to pass data':
      return (
        <div>
          <h2>
            {part.name}: {part.exerciseCount}
          </h2>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      )
    case 'Deeper type usage':
      return (
        <div>
          <h2>
            {part.name}: {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>Submission link: {part.exerciseSubmissionLink}</p>
        </div>
      )
    case 'Ultimate TypeScript React course':
      return (
        <div>
          <h2>
            {part.name}: {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>{part.statCount}</p>
        </div>
      )
    default:
      return assertNever(part)
  }
}
