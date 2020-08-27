import React from 'react'
import { Total } from './Total'
import { Content } from './Content'
import { Header } from './Header'
import { CoursePart } from '../types'

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is an awesome course part',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
  },
]

const App: React.FC = () => {
  const courseName = 'Half Stack application development'

  return (
    <div>
      <Header text={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
