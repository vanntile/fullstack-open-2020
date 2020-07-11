import React from 'react'

import { Header } from './Header'
import { Total } from './Total'
import { Content } from './Content'

const Course = ({ name, course }) => {
  return (
    <div>
      <h1>{name}</h1>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course
